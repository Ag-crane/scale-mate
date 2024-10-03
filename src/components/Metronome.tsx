import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import {
    Container,
    Pendulum,
} from "./Metronome.styles";
import { getTimeUntilNextBeat } from "../utils/getTimeUntilNextBeat";
import backgroundImage from "../assets/metronome.png";

interface MetronomeProps {
    bpm: number;
    isPlaying: boolean;
}

const Metronome: React.FC<MetronomeProps> = ({ bpm, isPlaying }) => {
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

        // Clock 초기화
        clockRef.current = new Tone.Clock((time) => {
            synthRef.current?.triggerAttackRelease("C4", "8n", time);
            setTick((prevTick) => (prevTick + 1) % 2);
        }, 60 / bpm); // BPM에 따른 주기 설정

        return () => {
            clockRef.current?.stop();
            clockRef.current?.dispose();
            synthRef.current?.dispose();
        };
    }, [bpm]);

    useEffect(() => {
        if (clockRef.current) {
            clockRef.current.frequency.value = bpm / 60; // 주기 업데이트
        }
    }, [bpm]);

    useEffect(() => {
        // 메트로놈 재생 상태에 따라 Clock 시작/정지
        if (clockRef.current) {
            clockRef.current.dispose();
        }

        if (isPlaying) {
            const timeUntilNextBeat = getTimeUntilNextBeat(bpm);

            clockRef.current = new Tone.Clock((time) => {
                synthRef.current?.triggerAttackRelease('C4', '8n', time);
                setTick((prevTick) => (prevTick + 1) % 2);
            }, bpm / 60);

            clockRef.current.start(Tone.now() + timeUntilNextBeat);
        } else {
            clockRef.current?.stop();
        }
    }, [isPlaying, bpm]);

    return (
        <Container backgroundImage={backgroundImage}>
            <Pendulum isPlaying={isPlaying} tick={tick} bpm={bpm} />
        </Container>
    );
};

export default Metronome;
