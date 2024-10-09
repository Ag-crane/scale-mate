import styled from "styled-components";

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

const OpenNote = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    font-weight: bold;
    font-size: 12px;

    & > div {
        background-color: #753c24;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    border-right: none;
`;

const NoteRow = styled.div`
    display: flex;
    height: 40px;
`;

const Note = styled.div<{
    isActive?: boolean;
    isOpenNote?: boolean;
    isScaleNote?: boolean;
    isRootNote?: boolean;
    selectedBlock: number | null;
    blockNumber: (number | null)[];
}>`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: black;
    font-weight: bold;
    font-size: 12px;

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
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: ${({ isScaleNote, blockNumber, selectedBlock }) => {
            if (!isScaleNote) return 0; // 스케일에 속하지 않는 노트는 보이지 않음
            if (selectedBlock === null) return 1; // 선택된 블록이 없으면
            return blockNumber.includes(selectedBlock) ? 1 : 0.3; // 선택된 블록에 속하는지 확인
        }};
    }

    border-right: "2px solid silver";

    &:last-child {
        border-right: none;
    }
`;

export {
    GuitarContainer,
    FretboardContainer,
    OpenNotesContainer,
    OpenNote,
    NoteRow,
    Note,
};
