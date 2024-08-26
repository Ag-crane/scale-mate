import React, { useState } from "react";
import SettingBoard from "./components/SettingBoard";
import ChromaticPlayer from "./components/ChromaticPlayer";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f2f5;
    padding: 20px;
    padding-top: 60px; /* Header의 높이만큼 패딩 추가 */
`;

const SettingBoardContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    max-width: 1200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #ffffff;
    padding: 20px;
`;

const ChromaticPlayerContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    max-width: 1200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #ffffff;
    padding: 20px;
`;

const Header = styled.div`
    background-color: #282c34;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

const App: React.FC = () => {
    const scales = ["Chromatic", "Major", "Minor", "Major Pentatonic", "Minor Pentatonic"];
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    const [bpm, setBpm] = useState<number>(120);

    return (
        <Container>
            <Header>Scale Mate</Header>
            <SettingBoardContainer>
                <SettingBoard scales={scales} keys={keys} defaultBpm={bpm} onBpmChange={setBpm} />
            </SettingBoardContainer>
            <ChromaticPlayerContainer>
                <ChromaticPlayer bpm={bpm} />
            </ChromaticPlayerContainer>
        </Container>
    );
};

export default App;
