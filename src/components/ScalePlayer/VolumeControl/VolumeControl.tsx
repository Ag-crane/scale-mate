import React, { useState } from "react";
import { VolumeControlContainer, VolumeLabel, VolumeSlider } from "./VolumeControl.styles";

interface VolumeControlProps {
    initialVolume?: number;
    onVolumeChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ initialVolume, onVolumeChange }) => {
    const [volume, setVolume] = useState(initialVolume);

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(event.target.value);
        setVolume(newVolume);
        onVolumeChange(newVolume);
    };

    return (
        <VolumeControlContainer>
            <VolumeLabel htmlFor="volume">Volume: {volume}dB</VolumeLabel>
            <VolumeSlider
                id="volume"
                min="-24"
                max="0"
                step="1"
                value={volume}
                onChange={handleVolumeChange}
            />
        </VolumeControlContainer>
    );
};

export default VolumeControl;
