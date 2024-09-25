import React, { useState } from "react";
import SettingBoard from "./components/SettingBoard";
import ScalePlayer from "./components/ScalePlayer";
import { Container, Header, ScalePlayerContainer, SettingBoardContainer } from "./App.styles";

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
            <SettingBoardContainer>
                <SettingBoard
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                    onSave={handleSave} // Save 버튼 클릭 시 노트 상태 초기화 함수 전달
                />
            </SettingBoardContainer>
            <ScalePlayerContainer>
                <ScalePlayer 
                    settings={settings} 
                    currentPlayingNotes={currentPlayingNotes}
                    setCurrentPlayingNotes={setCurrentPlayingNotes} // 상태 전달
                />
            </ScalePlayerContainer>
        </Container>
    );
};




export default App;
