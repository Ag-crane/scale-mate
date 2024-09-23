import React, { useState } from "react";
import * as Tone from "tone";
import { Button, ButtonContainer, Container } from "./ScalePlayer.styles";
import { getScaleBlocks, getScaleNotesForSettings } from "../data/Scales";
import Fretboard from "./Fretboard";
import { scaleBlockRanges } from "../data/Constants";

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
    setCurrentPlayingNotes
}) => {

    const [isPlaying, setIsPlaying] = useState(false);

    const playScale = async () => {
        setIsPlaying(true);
        await Tone.start();
 
        const synth = new Tone.Synth().toDestination();
        const transport = Tone.getTransport();
        transport.bpm.value = settings.bpm;

        transport.cancel();
        transport.stop();
        transport.position = 0;

        // 1. 설정된 스케일과 키로 필터링된 프렛보드 노트 가져오기
        const scaleFretboard = getScaleNotesForSettings(
            settings.scale,
            settings.key
        );
        // 2. 스케일별 블록 범위를 가져오기
        const blockRangesEntry = scaleBlockRanges[settings.scale];

        let blockRanges: [number, number][] = [];

        if (Array.isArray(blockRangesEntry)) {
            blockRanges = blockRangesEntry as [number, number][]; // Chromatic
        } else {
            blockRanges = (blockRangesEntry as Record<string, [number, number][]>)[settings.key]; // 나머지 스케일
        }        
        
        // 3. 지정된 범위에 따라 블록을 나누기
        const blocks = getScaleBlocks(scaleFretboard, blockRanges)

        // 4. Null이 아닌 노트들만 추출 (재생할 노트 목록 생성)
        const notesToPlay: { note: string, rowIndex: number, colIndex: number }[] = [];
        blocks.forEach((block) => {
            const currentBlockNotes: { note: string, rowIndex: number, colIndex: number }[] = [];
        
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
        

        // 5. 추출된 노트들을 연속적으로 스케줄링하고 재생 중인 노트를 추적
        notesToPlay.forEach((noteObj, index) => {
            transport.schedule((time) => {
                setCurrentPlayingNotes((prev) => {
                    // 이전 상태를 복사하고 모든 값을 false로 초기화한 후 현재 노트만 true로 설정
                    const newPositions = prev.map((row) =>
                        row.map(() => false)
                    );
                    newPositions[noteObj.rowIndex][noteObj.colIndex] = true;
                    return newPositions;
                });
                synth.triggerAttackRelease(noteObj.note, "8n", time);
            }, index * Tone.Time("8n").toSeconds());
        });

        transport.start();

        // 6. 총 노트 수 계산 후 재생 완료 시 상태 초기화
        const totalNotes = notesToPlay.length;
        transport.scheduleOnce(() => {
            setCurrentPlayingNotes(Array(6).fill(null).map(() => Array(12).fill(false)));
            setIsPlaying(false);
        }, totalNotes * Tone.Time("8n").toSeconds());
    };

    const stopScale = () => {
        const transport = Tone.getTransport();
        transport.stop();
        transport.cancel();
        setIsPlaying(false);
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
                scaleNotes={getScaleNotesForSettings(settings.scale, settings.key)}
                rootNote={settings.key}
            />
        </Container>
    );
};

export default ScalePlayer;
