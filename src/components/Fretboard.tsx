import React from "react";
import styled from "styled-components";

const GuitarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const fretboard = [
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
    ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],
    ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],
    ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"],
    ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
];

const FretboardContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    border: 2px solid black;
    width: 950px;
    height: 240px;
    margin: 20px auto;
    padding: 10px 0px;
    background-color: #a0522d; // 나무 색상
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

const Note = styled.div<{ isOpenNote?: boolean }>`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: black;
    font-weight: bold;
    font-size: 12px;

    ${({ isOpenNote }) =>
        !isOpenNote
            ? `
                border-right: 2px solid silver;

                &:last-child {
                    border-right: none;
                }
            `
            : `
                border-right: none;
            `}

    & > div {
        background-color: ${({ isOpenNote }) => (isOpenNote ? "#333" : "#fff")};
        color: ${({ isOpenNote }) => (isOpenNote ? "#fff" : "#333")};
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Fretboard: React.FC = () => {
    return (
        <GuitarContainer>
            <OpenNotesContainer>
                {fretboard.map((string, stringIndex) => (
                    <Note key={stringIndex} isOpenNote>
                        <div>{string[0]}</div>
                    </Note>
                ))}
            </OpenNotesContainer>
            <FretboardContainer>
                {fretboard.map((string, stringIndex) => (
                    <NoteRow key={stringIndex}>
                        {string.slice(1).map((note, fretIndex) => (
                            <Note key={fretIndex + 1}>
                                <div>{note}</div>
                            </Note>
                        ))}
                    </NoteRow>
                ))}
            </FretboardContainer>
        </GuitarContainer>
    );
};

export default Fretboard;
