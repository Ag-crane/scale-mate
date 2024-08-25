import React from "react";
import styled from "styled-components";

const GuitarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const fretboard = [
    ["F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3"], // 6번 줄
    ["A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3"], // 5번 줄
    ["D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4"], // 4번 줄
    ["G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4"], // 3번 줄
    ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"], // 2번 줄
    ["F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5"], // 1번 줄
];

const openNotes = ["E2", "A2", "D3", "G3", "B3", "E4"];

const FretboardContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    border: 2px solid black;
    width: 950px;
    height: 240px;
    margin: 20px auto;
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
    currentNote: string | null;
    playedNotesCount: number;
}

const getNotePosition = (note: string | null, playedNotesCount: number) => {
    if (!note) return { stringIndex: -1, fretIndex: -1 };

    const stringIndex = Math.floor(playedNotesCount / 12); // 12개씩 묶어서 줄을 결정
    const fretIndex = playedNotesCount % 12; // 12로 나눈 나머지 값이 프렛 인덱스

    return { stringIndex, fretIndex };
};

const Fretboard: React.FC<FretboardProps> = ({ currentNote, playedNotesCount }) => {
    const { stringIndex, fretIndex } = getNotePosition(currentNote, playedNotesCount);

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
                {fretboard.map((string, sIndex) => (
                    <NoteRow key={sIndex}>
                        {string.map((note, fIndex) => (
                            <Note key={fIndex + 1} isActive={sIndex === stringIndex && fIndex === fretIndex}>
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
