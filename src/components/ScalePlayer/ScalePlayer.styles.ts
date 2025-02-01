import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BottomControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    gap: 20px;
    margin-top: 20px;
    margin-right: 8px;
`;

const BlockSelectorContainer = styled.div`
    display: flex;
    margin-left: 44px;
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
    BottomControls,
    BlockSelectorContainer,
    ButtonContainer,
    Button,
};
