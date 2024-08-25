import React, { useState } from "react";
import Fretboard from "./Fretboard";
import * as Tone from "tone";
import { ChromaticNotes } from "../data/scales/Chromatic";

const ChromaticPlayer: React.FC = () => {
    const [currentNote, setCurrentNote] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playedNotesCount, setPlayedNotesCount] = useState(0); // 노트 개수 카운터
    const bpm = 120;

    const playChromaticScale = async () => {
        setIsPlaying(true);
        setPlayedNotesCount(0); // 초기화
        await Tone.start();
        
        const synth = new Tone.Synth().toDestination();
        const transport = Tone.getTransport();
        transport.bpm.value = bpm;

        transport.cancel();
        transport.stop();
        transport.position = 0;

        ChromaticNotes.forEach((note, index) => {
            transport.schedule((time) => {
                setCurrentNote(note); // 현재 재생 중인 노트 설정
                setPlayedNotesCount((prevCount) => prevCount + 1); // 노트 개수 증가
                synth.triggerAttackRelease(note, "8n", time);
            }, index * Tone.Time("8n").toSeconds());
        });

        transport.start();

        // 스케일이 끝난 후 상태 초기화
        transport.scheduleOnce(() => {
            setCurrentNote(null);
            setIsPlaying(false);
        }, ChromaticNotes.length * Tone.Time("8n").toSeconds());
    };

    const stopChromaticScale = () => {
        const transport = Tone.getTransport();
        transport.stop();
        transport.cancel();
        setCurrentNote(null);
        setIsPlaying(false);
    };

    return (
        <div>
            <button onClick={playChromaticScale} disabled={isPlaying}>Play Chromatic Scale</button>
            <button onClick={stopChromaticScale} disabled={!isPlaying}>Stop</button>
            <Fretboard currentNote={currentNote} playedNotesCount={playedNotesCount} />
        </div>
    );
};

export default ChromaticPlayer;
