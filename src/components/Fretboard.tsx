import React from "react";
import { fretboard, openNotes } from "../data/Constants";
import { FretboardContainer, GuitarContainer, Note, NoteRow, OpenNotesContainer } from "./Fretboard.styles";

interface FretboardProps {
   currentPlayingNotes: boolean[][];
   scaleNotes: (string | null)[][]; // 선택한 스케일에 따른 프렛보드 노트 배열
   rootNote: string;                // 으뜸음 (Key)
}

const Fretboard: React.FC<FretboardProps> = ({currentPlayingNotes, scaleNotes, rootNote }) => {

    return (
        <GuitarContainer>
            <OpenNotesContainer>
                {openNotes.map((note: string, index: number) => (
                    <Note key={index} isOpenNote>
                        <div>{note.replace(/[0-9]/g, '')}</div>
                    </Note>
                ))}
            </OpenNotesContainer>
            <FretboardContainer>
                {fretboard.map((row: string[], rowIndex: number) => (
                    <NoteRow key={rowIndex}>
                        {row.map((note: string, colIndex: number) => {
                            const isActive = currentPlayingNotes[rowIndex][colIndex]; // 현재 재생 중인 노트
                            const isScaleNote = !!scaleNotes[rowIndex][colIndex];    // 스케일에 속하는 노트
                            const isRootNote = rootNote !== '' && !!(scaleNotes[rowIndex][colIndex]?.startsWith(rootNote)); // rootNote가 빈 문자열인 경우 처리
                            
                            return (
                                <Note 
                                    key={colIndex + 1}  
                                    isActive={isActive}
                                    isScaleNote={isScaleNote}
                                    isRootNote={isRootNote}
                                >
                                    <div>{note.replace(/[0-9]/g, '')}</div>
                                </Note>
                            );
                        })}
                    </NoteRow>
                ))}
            </FretboardContainer>
        </GuitarContainer>
    );
};

export default Fretboard;
