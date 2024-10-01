import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { Button, ButtonContainer, Container } from "./ScalePlayer.styles";
import { getScaleBlocks, getScaleNotesForSettings } from "../utils/Scales";
import Fretboard from "./Fretboard";
import { scaleBlockRanges } from "../data/constants";
import { getTimeUntilNextBeat } from "../utils/getTimeUntilNextBeat";

interface ScalePlayerProps {
    settings: {
        bpm: number;
        scale: string;
        key: string;
    };
    currentPlayingNotes: boolean[][];
    setCurrentPlayingNotes: React.Dispatch<React.SetStateAction<boolean[][]>>;
}

const ScalePlayer: React.FC<ScalePlayerProps> = ({
    settings,
    currentPlayingNotes,
    setCurrentPlayingNotes,
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
            blockRanges = (blockRangesEntry as Record<
                string,
                [number, number][]
            >)[settings.key];
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

        clockRef.current = new Tone.Clock((time) => {
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
                const newPositions = prev.map((row) => row.map(() => false));
                newPositions[noteObj.rowIndex][noteObj.colIndex] = true;
                return newPositions;
            });
            synthRef.current?.triggerAttackRelease(
                noteObj.note,
                '8n',
                time
            );
            indexRef.current += 1;
        }, (settings.bpm / 60 * 4));

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

    return (
        <Container>
            <ButtonContainer>
                <Button onClick={playScale} disabled={isPlaying}>
                    Play
                </Button>
                <Button onClick={stopScale} disabled={!isPlaying}>
                    Stop
                </Button>
            </ButtonContainer>
            <Fretboard
                currentPlayingNotes={currentPlayingNotes}
                scaleNotes={getScaleNotesForSettings(
                    settings.scale,
                    settings.key
                )}
                rootNote={settings.key}
            />
        </Container>
    );
};


export default ScalePlayer;
