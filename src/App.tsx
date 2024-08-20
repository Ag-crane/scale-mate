import React from "react";
import Fretboard from "./components/Fretboard";
import SettingBoard from "./components/SettingBoard";

const App: React.FC = () => {
    const scales = ["Chromatic", "C Major", "G Major", "D Minor", "A Minor"];

    return (
        <div className="App">
            <div>
                <h1>Guitar Fretboard</h1>
                <Fretboard />
            </div>
            <div>
                <h1>Setting Board</h1>
                <SettingBoard scales={scales} />
            </div>
        </div>
    );
};

export default App;
