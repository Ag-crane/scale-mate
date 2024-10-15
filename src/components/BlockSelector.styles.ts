import styled from "styled-components";

const BlockSelectorContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    gap: 10px;
`;

const BlockButton = styled.button<{ isSelected: boolean }>`
    padding: 10px 20px;
    background-color: ${({ isSelected }) =>
        isSelected ? "#4a90e2" : "#ccc"};
    color: ${({ isSelected }) =>
        isSelected
            ? "#fff"
            : "#333"};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${({ isSelected }) =>
            isSelected ? "#357ABD" : "#bbb"};
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        cursor: not-allowed;
        transform: none;
    }
`;

export { BlockSelectorContainer, BlockButton };
