import React, { useState } from "react";
import {
    VolumeButton,
    VolumeControlContainer,
    VolumeSlider,
} from "./VolumeControl.styles";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface VolumeControlProps {
    initialVolume?: number;
    onVolumeChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
    initialVolume = 0,
    onVolumeChange,
}) => {
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
            <VolumeButton onClick={toggleMute}>
                {isMuted ? (
                    <FaVolumeMute size={22} />
                ) : (
                    <FaVolumeUp size={22} />
                )}
            </VolumeButton>
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
