import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Button, Container, ControlPanel, Pendulum } from './Metronome.styles';
import { getTimeUntilNextBeat } from '../utils/getTimeUntilNextBeat';

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
                type: 'triangle',
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
            synthRef.current?.triggerAttackRelease('C4', '8n', time);
            setTick((prevTick) => (prevTick + 1) % 2);
        }, (60 / bpm)); // BPM에 따른 주기 설정

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
        if (isPlaying) {
            clockRef.current?.start();
        } else {
            clockRef.current?.stop();
        }
    }, [isPlaying]);

    const startMetronome = () => {
        if (clockRef.current) {
            clockRef.current.dispose();
        }

        const timeUntilNextBeat = getTimeUntilNextBeat(bpm);

        clockRef.current = new Tone.Clock((time) => {
            synthRef.current?.triggerAttackRelease('C4', '8n', time);
            setTick((prevTick) => (prevTick + 1) % 2);
        }, bpm / 60);

        clockRef.current.start(Tone.now() + timeUntilNextBeat);
        setIsPlaying(true);
    };

    const stopMetronome = () => {
        clockRef.current?.stop();
        setIsPlaying(false);
    };

    return (
        <Container>
            <Pendulum isPlaying={isPlaying} tick={tick} bpm={bpm} />
            <ControlPanel>
                <Button onClick={() => (isPlaying ? stopMetronome() : startMetronome())}>
                    {isPlaying ? 'Stop' : 'Start'}
                </Button>
            </ControlPanel>
        </Container>
    );
};

export default Metronome;
