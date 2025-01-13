import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const FretboardContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const BottomControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    gap: 20px;
`;

const BlockSelectorContainer = styled.div`
    flex: 1;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Button = styled.button`
    width: 50px;
    height: 40px;
    padding-top: 5px;
    border: #ccc 1px solid;
    border-radius: 5px;
`;

export {
    Container,
    FretboardContainer,
    BottomControls,
    BlockSelectorContainer,
    ButtonContainer,
    Button,
};
