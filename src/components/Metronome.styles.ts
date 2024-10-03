import styled, { keyframes, css } from 'styled-components';

// 좌우로 움직이는 애니메이션
const swingLeftRight = keyframes`
  0% { transform: rotate(20deg); }
  50% { transform: rotate(-20deg); }
  100% { transform: rotate(20deg); }
`;

const Container = styled.div<{ backgroundImage: string}>`
    width: 100%;
    max-width: 400px;
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-size: 200px 220px;
    background-position: center;
    background-repeat: no-repeat;
`;

const Pendulum = styled.div<{ isPlaying: boolean; tick: number; bpm: number }>`
    width: 8px;
    height: 120px;
    background-color: ${({ isPlaying }) => (isPlaying ? '#FF6347' : '#ddd')};
    transform-origin: bottom center;
    border-radius: 4px;
    margin-bottom: 40px;

    ${({ isPlaying, bpm }) =>
        isPlaying
            ? css`
                animation: ${swingLeftRight} ${120 / bpm}s infinite ease-in-out;
              `
            : css`
                transform: rotate(0deg);
              `};
    transition: transform 0.5s ease-in-out;
`;

const ControlPanel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
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

export { swingLeftRight, Container, Pendulum, ControlPanel, Input, Label };