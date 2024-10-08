import React from "react";
import { fretboard, openNotes } from "../data/constants";
import { FretboardContainer, GuitarContainer, Note, NoteRow, OpenNote, OpenNotesContainer } from "./Fretboard.styles";

interface FretboardProps {
   currentPlayingNotes: boolean[][];
   scaleNotes: (string | null)[][];
   rootNote: string;
   selectedBlock: number | null;
   blockNumbers: (number | null)[][][];
}

const Fretboard: React.FC<FretboardProps> = ({currentPlayingNotes, scaleNotes, rootNote, selectedBlock, blockNumbers }) => {

    return (
        <GuitarContainer>
            <OpenNotesContainer>
                {openNotes.map((note: string, index: number) => (
                    <OpenNote key={index}>
                        <div>{note.replace(/[0-9]/g, '')}</div>
                    </OpenNote>
                ))}
            </OpenNotesContainer>
            <FretboardContainer>
                {fretboard.map((row: string[], rowIndex: number) => (
                    <NoteRow key={rowIndex}>
                        {row.map((note: string, colIndex: number) => {
                            const isActive = currentPlayingNotes[rowIndex][colIndex];
                            const isScaleNote = !!scaleNotes[rowIndex][colIndex];
                            const isRootNote = rootNote !== '' && !!(scaleNotes[rowIndex][colIndex]?.startsWith(rootNote)); // rootNote가 빈 문자열인 경우 처리
                            const blockNumber = blockNumbers[rowIndex][colIndex];

                            return (
                                <Note 
                                    key={colIndex + 1}  
                                    isActive={isActive}
                                    isScaleNote={isScaleNote}
                                    isRootNote={isRootNote}
                                    selectedBlock={selectedBlock}
                                    blockNumber={blockNumber}
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
