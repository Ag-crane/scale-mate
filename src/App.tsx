import React, { useEffect, useState } from "react";
import SettingBoard from "./components/SettingBoard/SettingBoard";
import ScalePlayer from "./components/ScalePlayer/ScalePlayer";
import Metronome from "./components/Metronome/Metronome";
import { Header, LayoutContainer, MainContent, Sidebar } from "./App.styles";
import { start } from "tone";
import { initChannelTalk } from "./utils/initChannelTalk";

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

        // 채널톡 시작
        initChannelTalk();

        return () => {
            if (window.ChannelIO) {
                window.ChannelIO("shutdown");
            }
        };
    }, []);

    return (
        <>
            <Header>Scale Mate</Header>
            <LayoutContainer>
                <Sidebar>
                    <SettingBoard
                        settings={settings}
                        onSettingsChange={handleSettingsChange}
                        onSave={handleSave}
                    />
                    <Metronome bpm={settings.bpm} />
                </Sidebar>
                <MainContent>
                    <ScalePlayer
                        settings={settings}
                        currentPlayingNotes={currentPlayingNotes}
                        setCurrentPlayingNotes={setCurrentPlayingNotes}
                    />
                </MainContent>
            </LayoutContainer>
        </>
    );
};

export default App;
