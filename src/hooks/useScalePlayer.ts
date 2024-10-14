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
) => {
    const indexRef = useRef(0);
    const synthRef = useRef<Tone.Synth | null>(null);
    const clockRef = useRef<Tone.Clock | null>(null);
    const notesToPlayRef = useRef<NoteToPlay[]>([]);

    useEffect(() => {
        synthRef.current = new Tone.Synth().toDestination();

        return () => {
            clockRef.current?.stop();
            clockRef.current?.dispose();
            synthRef.current?.dispose();
        };
    }, []);

    const playScale = async () => {
        setIsPlaying(true);
        await Tone.start();

        const scaleFretboard = getScaleNotesForSettings(
            settings.scale,
            settings.key
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
                    clockRef.current?.stop();
                    setCurrentPlayingNotes(
                        Array(6)
                            .fill(null)
                            .map(() => Array(12).fill(false))
                    );
                    setIsPlaying(false);
                    return;
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

    return { playScale, stopScale };
};
