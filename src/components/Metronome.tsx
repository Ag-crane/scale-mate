import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Button, Container, ControlPanel, Input, Label, Pendulum } from './Metronome.styles';

const Metronome: React.FC = () => {
    const [bpm, setBpm] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [tick, setTick] = useState(0);
    const synthRef = useRef<Tone.Synth | null>(null);
    const loopRef = useRef<Tone.Loop | null>(null);

    useEffect(() => {
        synthRef.current = new Tone.Synth({
            oscillator: {
                type: 'triangle', // 메트로놈 클릭음의 음색
            },
            envelope: {
                attack: 0.001,
                decay: 0.1,
                sustain: 0,
                release: 0.1,
            },
        }).toDestination();

        return () => {
            if (loopRef.current) {
                loopRef.current.dispose();
            }
            if (synthRef.current) {
                synthRef.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            loopRef.current = new Tone.Loop((time) => {
                synthRef.current?.triggerAttackRelease('C4', '8n', time); // 메트로놈 클릭음 재생
                setTick((prevTick) => (prevTick + 1) % 2); // 0과 1 사이를 반복하여 좌우로 스윙
            }, '4n').start(0);

            Tone.Transport.bpm.value = bpm;
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
            Tone.Transport.cancel();
            if (loopRef.current) {
                loopRef.current.dispose();
                loopRef.current = null;
            }
        }
    }, [isPlaying, bpm]);

    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBpm = Number(event.target.value);
        if (newBpm >= 40 && newBpm <= 240) {
            setBpm(newBpm);
        }
    };

    return (
        <Container>
            <Pendulum isPlaying={isPlaying} tick={tick} bpm={bpm} /> {/* 좌우 움직임 애니메이션 */}
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
