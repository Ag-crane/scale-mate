import React from "react";
import * as Tone from "tone";
import { ChromaticNotes } from "../data/scales/Chromatic";

let synth: Tone.Synth | null = null;

const playChromaticScale = async (bpm: number) => {
    await Tone.start();

    if (!synth) {
        synth = new Tone.Synth().toDestination();
    }

    const transport = Tone.getTransport();
    transport.bpm.value = bpm;

    transport.cancel();  // 기존의 트랜스포트 이벤트를 모두 취소
    transport.stop();    // 재생 중인 것을 멈추고
    transport.position = 0; // 트랜스포트의 위치를 처음으로 재설정

    ChromaticNotes.forEach((note, index) => {
        transport.schedule((time) => {
            synth?.triggerAttackRelease(note, "8n", time);
        }, index * Tone.Time("8n").toSeconds());
    });

    transport.start();
};

const stopChromaticScale = () => {
    const transport = Tone.getTransport();
    transport.stop();
    transport.cancel();

    if (synth) {
        synth.triggerRelease();
    }
};

const ChromaticPlayer: React.FC = () => {
    const handlePlay = () => {
        playChromaticScale(120); // 크로매틱 스케일을 120 BPM으로 재생
    };

    const handleStop = () => {
        stopChromaticScale(); // 재생 중지
    };

    return (
        <div>
            <button onClick={handlePlay}>Play Chromatic Scale</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    );
};

export default ChromaticPlayer;
