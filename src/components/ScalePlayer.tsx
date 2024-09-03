import React, { useState } from "react";
import Fretboard from "./Fretboard";
import * as Tone from "tone";
import { ChromaticNotes } from "../data/scales/Chromatic";
import { Button, ButtonContainer, Container } from "./ScalePlayer.styles";

interface ScalePlayerProps {
    bpm: number;
}

const ScalePlayer: React.FC<ScalePlayerProps> = ({ bpm }) => {
    const [currentPlayingNotes, setcurrentPlayingNotes] = useState<boolean[][]>(
        Array(6).fill(null).map(() => Array(12).fill(false))
    );
    const [isPlaying, setIsPlaying] = useState(false);

    const playChromaticScale = async () => {
        setIsPlaying(true);
        await Tone.start();
        
        const synth = new Tone.Synth().toDestination();
        const transport = Tone.getTransport();
        transport.bpm.value = bpm;

        transport.cancel();
        transport.stop();
        transport.position = 0;

        // Null이 아닌 노트들만 추출
        const notesToPlay: { note: string, rowIndex: number, colIndex: number }[] = [];
        ChromaticNotes.forEach((row, rowIndex) => {
            row.forEach((note, colIndex) => {
                if (note) {
                    notesToPlay.push({ note, rowIndex, colIndex });
                }
            });
        });

        // 추출된 노트들을 연속적으로 스케줄링
        notesToPlay.forEach((noteObj, index) => {
            transport.schedule((time) => {
                setcurrentPlayingNotes(prev => {
                    const newPositions = prev.map(row => row.map(() => false));
                    newPositions[noteObj.rowIndex][noteObj.colIndex] = true;
                    return newPositions;
                });
                synth.triggerAttackRelease(noteObj.note, "8n", time);
            }, index * Tone.Time("8n").toSeconds());
        });

        transport.start();

        // 총 Note 수 계산
        const totalNotes = ChromaticNotes.flat().length;
        //  재생이 완료된 후 상태 초기화
        transport.scheduleOnce(() => {
            setcurrentPlayingNotes(Array(6).fill(null).map(() => Array(12).fill(false)));
            setIsPlaying(false);
        }, totalNotes * Tone.Time("8n").toSeconds() // 재생이 완료될 시간
        );
    };

    const stopChromaticScale = () => {
        const transport = Tone.getTransport();
        transport.stop();
        transport.cancel();
        setIsPlaying(false);
    };

    return (
        <Container>
            <ButtonContainer>
                <Button onClick={playChromaticScale} disabled={isPlaying}>Play</Button>
                <Button onClick={stopChromaticScale} disabled={!isPlaying}>Stop</Button>
            </ButtonContainer>
            <Fretboard currentPlayingNotes={currentPlayingNotes} />
        </Container>
    );
};

export default ScalePlayer;
