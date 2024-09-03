import React from "react";
import { fretboard, openNotes } from "../data/TempConstants";
import { FretboardContainer, GuitarContainer, Note, NoteRow, OpenNotesContainer } from "./Fretboard.styles";

interface FretboardProps {
   currentPlayingNotes: boolean[][];
}

const Fretboard: React.FC<FretboardProps> = ({currentPlayingNotes }) => {

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
                        {row.map((note: string, colIndex: number) => (
                            <Note key={colIndex + 1}  isActive={currentPlayingNotes[rowIndex][colIndex]}>
                                <div>{note.replace(/[0-9]/g, '')}</div>
                            </Note>
                        ))}
                    </NoteRow>
                ))}
            </FretboardContainer>
        </GuitarContainer>
    );
};

export default Fretboard;
