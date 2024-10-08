import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { Button, ButtonContainer, Container, HiddenCheckbox, Slider, ToggleSwitch } from "./ScalePlayer.styles";
import { getScaleBlocks, getScaleNotesForSettings } from "../utils/scales";
import Fretboard from "./Fretboard";
import { scaleBlockRanges } from "../data/constants";
import { getTimeUntilNextBeat } from "../utils/getTimeUntilNextBeat";
import BlockSelector from "./BlockSelector";

interface ScalePlayerProps {
    settings: {
        bpm: number;
        scale: string;
        key: string;
        subdivision: number;
    };
    currentPlayingNotes: boolean[][];
    setCurrentPlayingNotes: React.Dispatch<React.SetStateAction<boolean[][]>>;
    isMetronomePlaying: boolean;
    setIsMetronomePlaying: (isPlaying: boolean) => void;
}

const ScalePlayer: React.FC<ScalePlayerProps> = ({
    settings,
    currentPlayingNotes,
    setCurrentPlayingNotes,
    isMetronomePlaying,
    setIsMetronomePlaying,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const indexRef = useRef(0);
    const synthRef = useRef<Tone.Synth | null>(null);
    const clockRef = useRef<Tone.Clock | null>(null);
    const notesToPlayRef = useRef<
        { note: string; rowIndex: number; colIndex: number }[]
    >([]);

    useEffect(() => {
        synthRef.current = new Tone.Synth().toDestination();

        return () => {
            clockRef.current?.stop();
            clockRef.current?.dispose();
            synthRef.current?.dispose();
        };
    }, []);
  
    const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

    const blockRanges = useMemo(() => {
        const blockRangesEntry = scaleBlockRanges[settings.scale];
        if (Array.isArray(blockRangesEntry)) {
            return blockRangesEntry as [number, number][];
        } else {
            return (
                (blockRangesEntry as Record<string, [number, number][]>)[
                    settings.key
                ] || []
            );
        }
    }, [settings.scale, settings.key]);

    const availableBlocks = useMemo(() => {
        return blockRanges.map((_, index) => index + 1);
    }, [blockRanges]);

    const blockNumbers = useMemo(() => {
        const blockNumbersArray = Array.from({ length: 6 }, () => Array.from({ length: 16 }, () => [] as number[]));

        blockRanges.forEach(([startFret, endFret], blockIndex) => {
            for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
                for (let fretIndex = startFret - 1; fretIndex < endFret; fretIndex++) {
                    if (fretIndex >= 0 && fretIndex < 16) {
                        blockNumbersArray[stringIndex][fretIndex].push(blockIndex + 1);
                    }
                }
            }
        });
    
        return blockNumbersArray;
    }, [blockRanges]);
    
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

        // 선택된 블록이 있으면 해당 블록만 사용
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
            notesToPlay.push(...currentBlockNotes); // 상행
            notesToPlay.push(...currentBlockNotes.slice().reverse()); // 하행
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

    const handleMetronomeToggle = () => {
        setIsMetronomePlaying(!isMetronomePlaying);
    };

    return (
        <Container>
            <ButtonContainer>
                <Button onClick={playScale} disabled={isPlaying}>
                    Play
                </Button>
                <Button onClick={stopScale} disabled={!isPlaying}>
                    Stop
                </Button>
                <ToggleSwitch>
                    <HiddenCheckbox
                        checked={isMetronomePlaying}
                        onChange={handleMetronomeToggle}
                    />
                    <Slider isPlaying={isMetronomePlaying} />
                </ToggleSwitch>
            </ButtonContainer>
            <BlockSelector
                selectedBlock={selectedBlock}
                setSelectedBlock={setSelectedBlock}
                availableBlocks={availableBlocks}
            />
            <Fretboard
                currentPlayingNotes={currentPlayingNotes}
                scaleNotes={getScaleNotesForSettings(
                    settings.scale,
                    settings.key
                )}
                rootNote={settings.key}
                selectedBlock={selectedBlock}
                blockNumbers={blockNumbers}
            />
        </Container>
    );
};


export default ScalePlayer;
