import styled, { keyframes, css } from "styled-components";

const swingLeftRight = keyframes`
  0% { transform: rotate(20deg); }
  50% { transform: rotate(-20deg); }
  100% { transform: rotate(20deg); }
`;

const Container = styled.div<{ $backgroundImage: string }>`
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    background-image: url(${({ $backgroundImage }) => $backgroundImage});
    background-size: 200px 220px;
    background-position: center;
    background-repeat: no-repeat;
`;

const ToggleSwitch = styled.label`
    position: absolute;
    bottom: 21px;
    display: inline-block;
    width: 72px;
    height: 30px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Pendulum = styled.div<{ $isPlaying: boolean; $tick: number; $bpm: number }>`
    width: 8px;
    height: 120px;
    background-color: ${({ $isPlaying }) => ($isPlaying ? "#FF6347" : "#ddd")};
    transform-origin: bottom center;
    border-radius: 4px;
    margin-bottom: 40px;

    ${({ $isPlaying, $bpm }) =>
        $isPlaying
            ? css`
                  animation: ${swingLeftRight} ${120 / $bpm}s infinite
                      ease-in-out;
              `
            : css`
                  transform: rotate(0deg);
              `};
    transition: transform 0.5s ease-in-out;
`;

const Slider = styled.span<{ $isPlaying: boolean }>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ $isPlaying }) => ($isPlaying ? "#FF6347" : "#ccc")};
    transition: 0.4s;
    border-radius: 34px;

    &::before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: ${({ $isPlaying }) => ($isPlaying ? "44px" : "6px")};
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }

    &::after {
        content: '${({ $isPlaying }) => ($isPlaying ? "ON" : "OFF")}';
        position: absolute;
        top: 50%;
        left: ${({ $isPlaying }) => ($isPlaying ? "14px" : "40px")};
        transform: translateY(-50%);
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        pointer-events: none; 
    }
`;

const Input = styled.input`
    width: 60px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
`;

export {
    swingLeftRight,
    Container,
    ToggleSwitch,
    HiddenCheckbox,
    Pendulum,
    Slider,
    Input,
    Label,
};
