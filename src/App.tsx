import React, { useState } from "react";
import SettingBoard from "./components/SettingBoard";
import ScalePlayer from "./components/ScalePlayer";
import Metronome from "./components/Metronome";
import { Container, Header, MainContainer, MetronomeContainer, ScalePlayerContainer, SettingBoardContainer } from "./App.styles";

const App: React.FC = () => {
    const [settings, setSettings] = useState({
        bpm: 60,
        scale: 'Chromatic',
        key: '',
    });
    const [currentPlayingNotes, setCurrentPlayingNotes] = useState<boolean[][]>(
        Array(6).fill(null).map(() => Array(12).fill(false))
    );

    const handleSettingsChange = (newSettings: Partial<typeof settings>) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
            key: newSettings.scale === 'Chromatic' ? '' : newSettings.key || prevSettings.key,
        }));
    };

    const handleSave = () => {
        // Save 버튼을 누르면 현재 재생 중인 노트 상태를 초기화
        setCurrentPlayingNotes(Array(6).fill(null).map(() => Array(12).fill(false)));
    };

    return (
        <Container>
            <Header>Scale Mate</Header>
            <MainContainer>
                <SettingBoardContainer>
                    <SettingBoard
                        settings={settings}
                        onSettingsChange={handleSettingsChange}
                        onSave={handleSave}
                    />
                </SettingBoardContainer>
                <MetronomeContainer>
                    <Metronome />
                </MetronomeContainer>
            </MainContainer>
            <ScalePlayerContainer>
                <ScalePlayer 
                    settings={settings} 
                    currentPlayingNotes={currentPlayingNotes}
                    setCurrentPlayingNotes={setCurrentPlayingNotes}
                />
            </ScalePlayerContainer>
        </Container>
    );
};




export default App;
