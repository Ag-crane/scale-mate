import React from "react";
import styled from "styled-components";
import { fretboard, openNotes } from "../data/scales/Fretboard";

const GuitarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FretboardContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    border: 2px solid black;
    width: 950px;
    height: 240px;
    margin: 20px;
    padding: 10px 0px;
    background-color: #a0522d;
    border-radius: 10px;
`;

const OpenNotesContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    margin-right: 10px;
    height: 240px;
`;

const NoteRow = styled.div`
    display: flex;
    height: 40px;
`;

const Note = styled.div<{ isActive?: boolean; isOpenNote?: boolean }>`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: black;
    font-weight: bold;
    font-size: 12px;

    & > div {
        background-color: ${({ isActive, isOpenNote }) =>
            isActive ? "#ff0" : isOpenNote ? "#753c24" : "#fff"};
        color: ${({ isActive, isOpenNote }) => isActive ? "#000" : isOpenNote ? "#fff" : "#333"};
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
    } 

    border-right: ${({ isOpenNote }) => (isOpenNote ? "none" : "2px solid silver")};

    &:last-child {
        border-right: none;
    }
`;

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
