import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
`;

const Label = styled.label`
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
`;

const Select = styled.select`
    padding: 5px;
    font-size: 16px;
`;

const Input = styled.input`
    padding: 5px;
    font-size: 16px;
    width: 60px;
    text-align: center;
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};    border: none;
    border-radius: 5px;
    background-color: rgb(40, 44, 52, 0.5);
    color: white;

    &:hover {
        background-color: rgb(40, 44, 52, 1);
    }
`;

export { Container, Label, Select, Input, Button };
