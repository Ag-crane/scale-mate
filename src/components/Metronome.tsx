import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Button, Container, ControlPanel, Input, Label, Pendulum } from './Metronome.styles';

const Metronome: React.FC = () => {
    const [bpm, setBpm] = useState(60);
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

    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBpm = Number(event.target.value);
        if (newBpm >= 40 && newBpm <= 240) {
            setBpm(newBpm);
        }
    };

    return (
        <Container>
            <Pendulum isPlaying={isPlaying} tick={tick} bpm={bpm} />
            <ControlPanel>
                <Label htmlFor="bpm">BPM: </Label>
                <Input
                    type="number"
                    id="bpm"
                    value={bpm}
                    onChange={handleBpmChange}
                    min="40"
                    max="240"
                />
                <Button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? 'Stop' : 'Start'}
                </Button>
            </ControlPanel>
        </Container>
    );
};

export default Metronome;
