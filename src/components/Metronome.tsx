import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import {
    Container,
    HiddenCheckbox,
    Pendulum,
    Slider,
    ToggleSwitch,
} from "./Metronome.styles";
import { getTimeUntilNextBeat } from "../utils/getTimeUntilNextBeat";
import backgroundImage from "../assets/metronome.png";

interface MetronomeProps {
    bpm: number;
}

const Metronome: React.FC<MetronomeProps> = ({ bpm }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [tick, setTick] = useState(0);
    const synthRef = useRef<Tone.Synth | null>(null);
    const clockRef = useRef<Tone.Clock | null>(null);

    useEffect(() => {
        synthRef.current = new Tone.Synth({
            oscillator: {
                type: "triangle",
            },
            envelope: {
                attack: 0.001,
                decay: 0.1,
                sustain: 0,
                release: 0.1,
            },
        }).toDestination();

        clockRef.current = new Tone.Clock((time) => {
            synthRef.current?.triggerAttackRelease("C4", "8n", time);
            setTick((prevTick) => (prevTick + 1) % 2);
        }, 60 / bpm);

        return () => {
            clockRef.current?.stop();
            clockRef.current?.dispose();
            synthRef.current?.dispose();
        };
    }, [bpm]);

    useEffect(() => {
        if (clockRef.current) {
            clockRef.current.frequency.value = bpm / 60;
        }
    }, [bpm]);

    useEffect(() => {
        if (clockRef.current) {
            clockRef.current.dispose();
        }

        if (isPlaying) {
            const timeUntilNextBeat = getTimeUntilNextBeat(bpm);

            clockRef.current = new Tone.Clock((time) => {
                synthRef.current?.triggerAttackRelease("C4", "8n", time);
                setTick((prevTick) => (prevTick + 1) % 2);
            }, bpm / 60);

            clockRef.current.start(Tone.now() + timeUntilNextBeat);
        } else {
            clockRef.current?.stop();
        }
    }, [isPlaying, bpm]);

    const handleMetronomeToggle = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <Container backgroundImage={backgroundImage}>
            <ToggleSwitch>
                <HiddenCheckbox
                    checked={isPlaying}
                    onChange={handleMetronomeToggle}
                />
                <Slider isPlaying={isPlaying} />
            </ToggleSwitch>
            <Pendulum isPlaying={isPlaying} tick={tick} bpm={bpm} />
        </Container>
    );
};

export default Metronome;
