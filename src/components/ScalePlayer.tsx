import React, { useEffect, useState } from "react";
import {
    Button,
    ButtonContainer,
    Container,
    HiddenCheckbox,
    Slider,
    ToggleSwitch,
} from "./ScalePlayer.styles";
import Fretboard from "./Fretboard";
import BlockSelector from "./BlockSelector";
import { useBlockData } from "../hooks/useBlockData";
import { useScalePlayer } from "../hooks/useScalePlayer";
import { getScaleNotesForSettings } from "../utils/scales";

interface ScalePlayerProps {
    settings: {
        bpm: number;
        scale: string;
        key: string;
        subdivision: number;
    };
    currentPlayingNotes: boolean[][];
    setCurrentPlayingNotes: React.Dispatch<React.SetStateAction<boolean[][]>>;
    isMetronomePlaying: boolean;
    setIsMetronomePlaying: (isPlaying: boolean) => void;
}

const ScalePlayer: React.FC<ScalePlayerProps> = ({
    settings,
    currentPlayingNotes,
    setCurrentPlayingNotes,
    isMetronomePlaying,
    setIsMetronomePlaying,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setSelectedBlock(null);
    }, [settings.scale, settings.key]);

    const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

    // 블록 관련 데이터 처리 로직
    const { blockRanges, blockNumbers } = useBlockData(settings);

    // Tone.js 활용한 재생/정지 로직
    const { playScale, stopScale } = useScalePlayer(
        settings, 
        setCurrentPlayingNotes, 
        setIsPlaying, 
        selectedBlock,
    );

    const handleMetronomeToggle = () => {
        setIsMetronomePlaying(!isMetronomePlaying);
    };

    return (
        <Container>
            <ButtonContainer>
                <Button onClick={playScale} disabled={isPlaying}>
                    Play
                </Button>
                <Button onClick={stopScale} disabled={!isPlaying}>
                    Stop
                </Button>
                <ToggleSwitch>
                    <HiddenCheckbox
                        checked={isMetronomePlaying}
                        onChange={handleMetronomeToggle}
                    />
                    <Slider isPlaying={isMetronomePlaying} />
                </ToggleSwitch>
            </ButtonContainer>
            {settings.scale !== "Chromatic" && (
                <BlockSelector
                    selectedBlock={selectedBlock}
                    setSelectedBlock={setSelectedBlock}
                    availableBlocks={blockRanges.map((_, i) => i + 1)}
                />
            )}
            <Fretboard
                currentPlayingNotes={currentPlayingNotes}
                scaleNotes={getScaleNotesForSettings(
                    settings.scale,
                    settings.key
                )}
                rootNote={settings.key}
                selectedBlock={selectedBlock}
                blockNumbers={blockNumbers}
                scale={settings.scale}
            />
        </Container>
    );
};

export default ScalePlayer;
