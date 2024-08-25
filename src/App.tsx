import React, { useState } from "react";
import SettingBoard from "./components/SettingBoard";
import ChromaticPlayer from "./components/ChromaticPlayer";

const App: React.FC = () => {
    const scales = ["Chromatic", "Major", "Minor", "Major Pentatonic", "Minor Pentatonic"];
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    // BPM 상태를 App 컴포넌트에서 관리
    const [bpm, setBpm] = useState<number>(120);

    return (
        <div className="App">
            <div>
                <h1>Setting Board</h1>
                <SettingBoard scales={scales} keys={keys} defaultBpm={bpm} onBpmChange={setBpm} />
            </div>
            <div>
                <h1>Chromatic Player</h1>
                <ChromaticPlayer bpm={bpm} />
            </div>
        </div>
    );
};

export default App;
