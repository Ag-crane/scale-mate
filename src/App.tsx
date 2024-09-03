import React, { useState } from "react";
import SettingBoard from "./components/SettingBoard";
import ScalePlayer from "./components/ScalePlayer";
import { Container, Header, ScalePlayerContainer, SettingBoardContainer } from "./App.styles";

const App: React.FC = () => {
    const [settings, setSettings] = useState({
        bpm: 60,
        scale: 'Chromatic',
        key: 'C',
    });

    const handleSettingsChange = (newSettings: Partial<typeof settings>) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
        }));
    };

    return (
        <Container>
            <Header>Scale Mate</Header>
            <SettingBoardContainer>
                <SettingBoard
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                />
            </SettingBoardContainer>
            <ScalePlayerContainer>
                <ScalePlayer bpm={settings.bpm} />
            </ScalePlayerContainer>
        </Container>
    );
};



export default App;
