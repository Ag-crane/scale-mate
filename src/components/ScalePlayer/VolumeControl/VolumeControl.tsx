import React, { useState } from "react";
import { VolumeControlContainer, VolumeIcon, VolumeSlider } from "./VolumeControl.styles";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface VolumeControlProps {
    initialVolume?: number;
    onVolumeChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ initialVolume = 0, onVolumeChange }) => {
    const [volume, setVolume] = useState(initialVolume);
    const [isMuted, setIsMuted] = useState(false);

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(event.target.value);
        setVolume(newVolume);
        onVolumeChange(isMuted ? -60 : newVolume);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        onVolumeChange(!isMuted ? -60 : volume);
    };

    return (
        <VolumeControlContainer>
            <VolumeIcon onClick={toggleMute}>
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </VolumeIcon>
            <VolumeSlider
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
