import React from "react";
import { fretboard, openNotes } from "../data/scales/Fretboard";
import { FretboardContainer, GuitarContainer, Note, NoteRow, OpenNotesContainer } from "./Fretboard.styles";

interface FretboardProps {
   currentPlayingNotes: boolean[][];
}

const Fretboard: React.FC<FretboardProps> = ({currentPlayingNotes }) => {

    return (
        <GuitarContainer>
            <OpenNotesContainer>
                {openNotes.map((note, index) => (
                    <Note key={index} isOpenNote>
                        <div>{note.replace(/[0-9]/g, '')}</div>
                    </Note>
                ))}
            </OpenNotesContainer>
            <FretboardContainer>
                {fretboard.map((row, rowIndex) => (
                    <NoteRow key={rowIndex}>
                        {row.map((note, colIndex) => (
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
