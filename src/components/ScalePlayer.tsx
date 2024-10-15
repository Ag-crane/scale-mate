import React, { useEffect, useState } from "react";
import {
    Button,
    ButtonContainer,
    Container,
    HiddenCheckbox,
    Slider,
    ToggleSwitch,
} from "./ScalePlayer.styles";
import {
    PiPlayFill,
    PiStopFill,
    PiRepeatBold,
    PiRepeatOnceBold,
} from "react-icons/pi";
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
    const [isRepeat, setIsRepeat] = useState(false);

    // 블록 관련 데이터 처리 로직
    const { blockRanges, blockNumbers } = useBlockData(settings);

    // Tone.js 활용한 재생/정지 로직
    const { playScale, stopScale } = useScalePlayer(
        settings,
        setCurrentPlayingNotes,
        setIsPlaying,
        selectedBlock,
        isRepeat
    );

    const handleMetronomeToggle = () => {
        setIsMetronomePlaying(!isMetronomePlaying);
    };

    const togglePlayStop = () => {
        if (isPlaying) {
            stopScale();
        } else {
            playScale();
        }
    };

    const togglePlaybackMode = () => {
        setIsRepeat((prev) => !prev); // '한번만 재생' <-> '반복 재생' 모드 토글
    };

    return (
        <Container>
            <ButtonContainer>
                <Button onClick={togglePlayStop}>
                    {isPlaying ? (
                        <PiStopFill size={20} />
                    ) : (
                        <PiPlayFill size={20} />
                    )}
                </Button>
                <Button onClick={togglePlaybackMode}>
                    {isRepeat ? (
                        <PiRepeatBold size={22} />
                    ) : (
                        <PiRepeatOnceBold size={22} />
                    )}
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
                    isPlaying={isPlaying}
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
