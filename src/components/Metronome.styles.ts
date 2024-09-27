import styled, { keyframes, css } from 'styled-components';

// 좌우로 움직이는 애니메이션
const swingLeftRight = keyframes`
  0% { transform: rotate(-20deg); }
  50% { transform: rotate(20deg); }
  100% { transform: rotate(-20deg); }
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const Pendulum = styled.div<{ isPlaying: boolean; tick: number; bpm: number }>`
    width: 8px;
    height: 120px;
    background-color: ${({ isPlaying }) => (isPlaying ? '#FF6347' : '#ddd')};
    transform-origin: top center;
    border-radius: 4px;
    margin-bottom: 20px;

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
    font-size: 14px;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
`;

const Button = styled.button`
    padding: 8px 20px;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007BFF')};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#ccc' : '#0056b3')};
    }
`;

export { swingLeftRight, Container, Pendulum, ControlPanel, Input, Label, Button };