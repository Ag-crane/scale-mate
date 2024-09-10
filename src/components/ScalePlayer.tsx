import React, { useState } from "react";
import Fretboard from "./Fretboard";
import * as Tone from "tone";
import { Button, ButtonContainer, Container } from "./ScalePlayer.styles";
import { getScaleNotesForSettings } from "../data/Scales";

interface ScalePlayerProps {
    settings: {
        bpm: number;
        scale: string;
        key: string;
    };
}

const ScalePlayer: React.FC<ScalePlayerProps> = ({ settings }) => {
    const [currentPlayingNotes, setcurrentPlayingNotes] = useState<boolean[][]>(
        Array(6).fill(null).map(() => Array(12).fill(false))
    );
    const [isPlaying, setIsPlaying] = useState(false);

    const playChromaticScale = async () => {
        setIsPlaying(true);
        await Tone.start();
        
        const synth = new Tone.Synth().toDestination();
        const transport = Tone.getTransport();
        transport.bpm.value = settings.bpm;

        transport.cancel();
        transport.stop();
        transport.position = 0;

        // Scales.ts에서 설정된 스케일과 키로 필터링된 노트 가져오기
        const notes = getScaleNotesForSettings(settings.scale, settings.key);

        // Null이 아닌 노트들만 추출
        const notesToPlay: { note: string, rowIndex: number, colIndex: number }[] = [];
        notes.forEach((row, rowIndex) => {
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
        const totalNotes = notesToPlay.flat().length;
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
