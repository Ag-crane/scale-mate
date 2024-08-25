import React from "react";
import * as Tone from "tone";

let synth: Tone.Synth | null = null;

const guitarTuning = [
    "E2", // 6번 줄 (저음 E)
    "A2", // 5번 줄
    "D3", // 4번 줄
    "G3", // 3번 줄
    "B3", // 2번 줄
    "E4", // 1번 줄 (고음 E)
];

const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

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

    let timeIndex = 0;

    for (let positionStartFret = 1; positionStartFret <= 9; positionStartFret++) {
        guitarTuning.forEach((openNote, stringIndex) => {
            let [note, octave] = parseNoteAndOctave(openNote);
            octave = parseInt(octave, 10);

            // 프렛 위치에 맞게 현재 음으로 이동
            for (let i = 0; i < positionStartFret - 1; i++) {
                const noteIndex = (chromaticScale.indexOf(note) + 1) % chromaticScale.length;
                note = chromaticScale[noteIndex];
                if (note === "C") {
                    octave += 1;
                }
            }

            // 4개의 프렛을 연주
            for (let fret = positionStartFret; fret < positionStartFret + 4; fret++) {
                const currentNote = `${note}${octave}`;
                transport.schedule((time) => {
                    synth?.triggerAttackRelease(currentNote, "8n", time);
                }, timeIndex * Tone.Time("8n").toSeconds());

                // 다음 음을 계산
                const noteIndex = (chromaticScale.indexOf(note) + 1) % chromaticScale.length;
                note = chromaticScale[noteIndex];
                if (note === "C") {
                    octave += 1;
                }

                timeIndex += 1; // 음을 연주하는 시간을 순차적으로 증가시킴
            }
        });
    }

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

const parseNoteAndOctave = (noteWithOctave: string): [string, string] => {
    const match = noteWithOctave.match(/([A-G]#?)(\d)/);
    if (match) {
        return [match[1], match[2]];
    }
    throw new Error(`Invalid note: ${noteWithOctave}`);
};

const ScalePlayer: React.FC = () => {
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

export default ScalePlayer;
