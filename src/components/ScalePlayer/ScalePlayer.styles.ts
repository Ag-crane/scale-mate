import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

export { Container, ButtonContainer, Button };
