import { fretboard } from "./Constants";

// 스케일 패턴 정의
const scalePatterns: Record<string, number[]> = {
    Chromatic: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 반음계
    Major: [2, 2, 1, 2, 2, 2, 1], // (W-W-H-W-W-W-H)
    Minor: [2, 1, 2, 2, 1, 2, 2], // (W-H-W-W-H-W-W)
    MajorPentatonic: [2, 2, 3, 2, 3], // (W-W-m3-W-m3)
    MinorPentatonic: [3, 2, 2, 3, 2], // (m3-W-W-m3-W)
};

// 특정 키의 루트에서 스케일을 생성하는 함수
const generateScaleNotes = (root: string, pattern: number[]): string[] => {
    const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    let startIndex = chromaticScale.indexOf(root);
    const notes: string[] = [];

    pattern.forEach(interval => {
        notes.push(chromaticScale[startIndex]);
        startIndex = (startIndex + interval) % chromaticScale.length;
    });

    return notes;
};

// 특정 스케일을 프렛보드에 맞춰서 변환하는 함수
const filterFretboardForScale = (fretboard: string[][], scaleNotes: string[]): (string | null)[][] => {
    return fretboard.map(string => 
        string.map(note => {
            const noteWithoutOctave = note.slice(0, -1); // 노트에서 옥타브 제거 (예: "C3" -> "C")
            return scaleNotes.includes(noteWithoutOctave) ? note : null;
        })
    );
};

// 설정에 따라 스케일을 생성하고, 결과물(프렛보드 형식의 노트 배열)을 반환하는 함수
export const getScaleNotesForSettings = (scale: string, key: string): (string | null)[][] => {
    const scalePattern = scalePatterns[scale];
    if (scalePattern) {
        const scaleNotes = generateScaleNotes(key, scalePattern);
        return filterFretboardForScale(fretboard, scaleNotes);
    }

    return Array(6).fill(null).map(() => Array(12).fill(null)); // 유효한 스케일이 없을 때 빈 2차원 배열 반환
};

// 특정 프렛 범위에서 노트를 추출하는 함수
const getNotesForFretRange = (fretboard: (string | null)[][], startFret: number, endFret: number): (string | null)[][] => {
    return fretboard.map(string => string.slice(startFret - 1, endFret)); // 주어진 프렛 범위에 해당하는 노트만 반환
};

// 특정 스케일을 블록 단위로 나누기 위한 함수
export const getScaleBlocks = (scaleFretboard: (string | null)[][], blockSize: number): (string | null)[][][] => {
    const blocks: (string | null)[][][] = [];

    // 프렛 범위 4개 단위로 블록을 나눔
    for (let i = 0; i < scaleFretboard[0].length; i += blockSize) {
        const block = getNotesForFretRange(scaleFretboard, i + 1, i + blockSize);
        blocks.push(block);
    }

    return blocks;
};

export const playBlock = (blockNotes: (string | null)[][]) => {
    const playOrder = [];

    // 하행 (높은 음에서 낮은 음으로 내려가기)
    for (let i = 0; i < blockNotes.length; i++) {
        for (let j = 0; j < blockNotes[i].length; j++) {
            if (blockNotes[i][j]) {
                playOrder.push(blockNotes[i][j] as string);
            }
        }
    }

    // 상행 (낮은 음에서 다시 높은 음으로 올라가기)
    for (let i = blockNotes.length - 1; i >= 0; i--) {
        for (let j = blockNotes[i].length - 1; j >= 0; j--) {
            if (blockNotes[i][j]) {
                playOrder.push(blockNotes[i][j] as string);
            }
        }
    }

    return playOrder;
};
