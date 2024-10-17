import styled from "styled-components";

const GuitarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FretboardContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 1000px;
    height: 240px;
    padding: 10px 0px;
    background-color: #6a4e42;
    border-radius: 5px;
    border-left: 15px solid #dcb47f;
`;

const OpenNotesContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: 240px;
`;

const OpenNote = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    font-weight: bold;
    font-size: 12px;
    margin-right: 10px;

    & > div {
        border: 1px dashed #6a4e42;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
    }

    border-right: none;
`;

const GuitarString = styled.div<{ thickness: number }>`
    position: absolute;
    width: 100%;
    height: ${({ thickness }) => thickness}px;
    background-color: #a9a9a9;
    left: 0;
    top: 50%;
`;

const NoteRow = styled.div`
    display: flex;
    height: 40px;
    position: relative;
`;

const Note = styled.div<{
    isActive?: boolean;
    isOpenNote?: boolean;
    isScaleNote?: boolean;
    isRootNote?: boolean;
    selectedBlock: number | null;
    blockNumber: (number | null)[];
    fretWidths: number[];
    fretIndex: number;
}>`
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${({ fretWidths, fretIndex }) => fretWidths[fretIndex] || 6}%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 2px solid lightgray;
    z-index: 2;

    &:first-child {
        border-left: none;
    }

    & > div {
        background-color: ${({ isActive, isScaleNote, isRootNote }) =>
            isActive
                ? "#ff0"
                : isRootNote
                ? "#ff6347"
                : isScaleNote
                ? "#fff"
                : "#eee"};
        color: ${({ isActive, isRootNote }) =>
            isActive ? "#000" : isRootNote ? "#fff" : "#333"};
        border-radius: 50%;
        width: 28px;
        height: 28px;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: ${({ isScaleNote, blockNumber, selectedBlock }) => {
            if (!isScaleNote) return 0; // 스케일에 속하지 않는 노트는 보이지 않음
            if (selectedBlock === null) return 1; // 선택된 블록이 없으면
            return blockNumber.includes(selectedBlock) ? 1 : 0.2; // 선택된 블록에 속하는지 확인
        }};
        z-index: 3;
    }
`;

export {
    GuitarContainer,
    FretboardContainer,
    OpenNotesContainer,
    OpenNote,
    NoteRow,
    Note,
    GuitarString,
};
