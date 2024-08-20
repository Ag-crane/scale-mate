import React from "react";
import Fretboard from "./components/Fretboard";
import SettingBoard from "./components/SettingBoard";

const App: React.FC = () => {
    const scales = ["Chromatic", "Major", "Minor", "Major Pentatonic", "Minor Pentatonic"];
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    return (
        <div className="App">
            <div>
                <h1>Guitar Fretboard</h1>
                <Fretboard />
            </div>
            <div>
                <h1>Setting Board</h1>
                <SettingBoard scales={scales} keys={keys} />
            </div>
        </div>
    );
};

export default App;
