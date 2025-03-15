import { useRef, useEffect } from "react";
import * as Tone from "tone";
import { getScaleBlocks, getScaleNotesForSettings } from "../utils/scales";
import { scaleBlockRanges } from "../data/constants";
import { getTimeUntilNextBeat } from "../utils/getTimeUntilNextBeat";

interface Settings {
    bpm: number;
    scale: string;
    key: string;
    subdivision: number;
}

interface NoteToPlay {
    note: string;
    rowIndex: number;
    colIndex: number;
}

export const useScalePlayer = (
    settings: Settings,
    setCurrentPlayingNotes: React.Dispatch<React.SetStateAction<boolean[][]>>,
    setIsPlaying: (isPlaying: boolean) => void,
    selectedBlock: number | null,
    isRepeat: boolean,
    synthVolume: number
) => {
    const indexRef = useRef(0);
    const synthRef = useRef<Tone.Synth | null>(null);
    const clockRef = useRef<Tone.Clock | null>(null);
    const notesToPlayRef = useRef<NoteToPlay[]>([]);
    const isRepeatRef = useRef(isRepeat);

    useEffect(() => {
        isRepeatRef.current = isRepeat;
    }, [isRepeat]);

    useEffect(() => {
        const eq = new Tone.EQ3(0, -10, 0).toDestination(); // 저음역대와 고음역대 줄임

        synthRef.current = new Tone.Synth({
            oscillator: {
                type: "triangle", // 기본 파형 설정
            },
            envelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.8,
                release: 1.2,
            },
        }).connect(eq);

        if (synthRef.current) {
            synthRef.current.volume.value = synthVolume;
        }

        return () => {
            clockRef.current?.stop();
            clockRef.current?.dispose();
            synthRef.current?.dispose();
        };
    }, []);

    // 볼륨 조정 함수를 추가
    const setSynthVolume = (volume: number) => {
        if (synthRef.current) {
            synthRef.current.volume.value = volume;
        }
    };

    const playScale = async () => {
        setIsPlaying(true);
        await Tone.start();

        const scaleFretboard = getScaleNotesForSettings(
            settings.key,
			settings.scale
        );
        const blockRangesEntry = scaleBlockRanges[settings.scale];

        let blockRanges: [number, number][] = [];

        if (Array.isArray(blockRangesEntry)) {
            blockRanges = blockRangesEntry as [number, number][];
        } else {
            blockRanges = (
                blockRangesEntry as Record<string, [number, number][]>
            )[settings.key];
        }

        if (selectedBlock !== null) {
            if (selectedBlock - 1 < blockRanges.length) {
                blockRanges = [blockRanges[selectedBlock - 1]]; // 블록 번호는 1부터 시작하므로 인덱스는 -1
            } else {
                console.error("선택한 블록 번호가 범위를 벗어났습니다.");
                return;
            }
        }

        const blocks = getScaleBlocks(scaleFretboard, blockRanges);

        const notesToPlay: {
            note: string;
            rowIndex: number;
            colIndex: number;
        }[] = [];
        blocks.forEach((block) => {
            const currentBlockNotes: {
                note: string;
                rowIndex: number;
                colIndex: number;
            }[] = [];
            block.forEach((row, rowIndex) => {
                row.forEach((note, colIndex) => {
                    if (note) {
                        currentBlockNotes.push({ note, rowIndex, colIndex });
                    }
                });
            });
            notesToPlay.push(...currentBlockNotes);
            notesToPlay.push(...currentBlockNotes.slice().reverse());
        });

        notesToPlayRef.current = notesToPlay;
        indexRef.current = 0;

        if (clockRef.current) {
            clockRef.current.dispose();
        }

        const timeUntilNextBeat = getTimeUntilNextBeat(settings.bpm);

        const beatDuration = 60 / settings.bpm; // 한 박자(4분음표)의 길이
        const noteInterval = beatDuration / settings.subdivision; // 노트 간 간격 (초 단위)

        clockRef.current = new Tone.Clock(
            (time) => {
                if (indexRef.current >= notesToPlayRef.current.length) {
                    if (isRepeatRef.current) {
                        // 최신 isRepeat 값을 사용
                        indexRef.current = 0; // 반복 재생일 경우 다시 처음으로
                    } else {
                        stopScale(); // 반복 재생이 아닐 경우 멈춤
                        return;
                    }
                }
                const noteObj = notesToPlayRef.current[indexRef.current];
                setCurrentPlayingNotes((prev) => {
                    const newPositions = prev.map((row) =>
                        row.map(() => false)
                    );
                    newPositions[noteObj.rowIndex][noteObj.colIndex] = true;
                    return newPositions;
                });
                synthRef.current?.triggerAttackRelease(
                    noteObj.note,
                    `${noteInterval}s`, // 노트 길이
                    time
                );
                indexRef.current += 1;
            },
            1 / noteInterval // 역수 취하여 Hz 단위로 변환
        );

        clockRef.current.start(Tone.now() + timeUntilNextBeat);
    };

    const stopScale = () => {
        clockRef.current?.stop();
        setIsPlaying(false);
        setCurrentPlayingNotes(
            Array(6)
                .fill(null)
                .map(() => Array(12).fill(false))
        );
    };

    return { playScale, stopScale, setSynthVolume };
};
