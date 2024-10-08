import styled from "styled-components";

const BlockSelectorContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    gap: 10px;
`;

const BlockButton = styled.button<{ isSelected: boolean }>`
    padding: 10px 20px;
    background-color: ${({ isSelected }) => (isSelected ? "#4a90e2" : "#ccc")};  // 선택된 버튼은 파란색, 나머지는 회색
    color: ${({ isSelected }) => (isSelected ? "#fff" : "#333")};  // 선택된 버튼의 텍스트는 흰색, 나머지는 어두운 회색
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "#357ABD" : "#bbb")};  // hover 효과
        transform: translateY(-2px);  // 버튼이 살짝 올라오는 애니메이션
    }

    &:active {
        transform: translateY(0);  // 클릭할 때 버튼이 다시 내려오는 효과
    }
`;

export { BlockSelectorContainer, BlockButton };
