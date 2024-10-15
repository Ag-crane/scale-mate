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
    border: #ccc 1px solid;
`;

const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-left: 10px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Slider = styled.span<{ isPlaying: boolean }>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ isPlaying }) => (isPlaying ? "#FF6347" : "#ccc")};
    transition: 0.4s;
    border-radius: 34px;

    &::before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: ${({ isPlaying }) => (isPlaying ? "30px" : "4px")};
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }
`;

export {
    Container,
    ButtonContainer,
    Button,
    ToggleSwitch,
    HiddenCheckbox,
    Slider,
};
