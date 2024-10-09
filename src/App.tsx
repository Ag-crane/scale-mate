import React, { useEffect, useState } from "react";
import SettingBoard from "./components/SettingBoard";
import ScalePlayer from "./components/ScalePlayer";
import Metronome from "./components/Metronome";
import {
    Container,
    Header,
    MainContainer,
    MetronomeContainer,
    ScalePlayerContainer,
    SettingBoardContainer,
} from "./App.styles";
import { start } from "tone";

const App: React.FC = () => {
    const [settings, setSettings] = useState({
        bpm: 60,
        scale: "Chromatic",
        key: "",
        subdivision: 1,
    });
    const [currentPlayingNotes, setCurrentPlayingNotes] = useState<boolean[][]>(
        Array(6)
            .fill(null)
            .map(() => Array(12).fill(false))
    );

    const [isMetronomePlaying, setIsMetronomePlaying] = useState(false);

    const handleSettingsChange = (newSettings: Partial<typeof settings>) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
            key:
                newSettings.scale === "Chromatic"
                    ? ""
                    : newSettings.key || prevSettings.key,
        }));
    };

    const handleSave = () => {
        // Save 버튼을 누르면 현재 재생 중인 노트 상태를 초기화
        setCurrentPlayingNotes(
            Array(6)
                .fill(null)
                .map(() => Array(12).fill(false))
        );
    };

    useEffect(() => {
        // Tone.js 시작
        const startTone = async () => {
            await start();
        };
        startTone();
    }, []);

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
                    <Metronome
                        bpm={settings.bpm}
                        isPlaying={isMetronomePlaying}
                    />
                </MetronomeContainer>
            </MainContainer>
            <ScalePlayerContainer>
                <ScalePlayer
                    settings={settings}
                    currentPlayingNotes={currentPlayingNotes}
                    setCurrentPlayingNotes={setCurrentPlayingNotes}
                    isMetronomePlaying={isMetronomePlaying}
                    setIsMetronomePlaying={setIsMetronomePlaying}
                />
            </ScalePlayerContainer>
        </Container>
    );
};

export default App;
