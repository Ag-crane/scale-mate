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
    let startIndex = chromaticScale.indexOf(root || "C");
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

// 특정 스케일을 지정된 블록 범위에 맞춰 나누는 함수
export const getScaleBlocks = (scaleFretboard: (string | null)[][], blockRanges: [number, number][]): (string | null)[][][] => {
    const blocks: (string | null)[][][] = [];

    blockRanges.forEach(([startFret, endFret]) => {
        const block = scaleFretboard.map(row => {
            return row.map((note, fretIndex) => {
                return fretIndex + 1 >= startFret && fretIndex + 1 <= endFret ? note : null; // 지정된 범위 내의 음만 유지
            });
        });
        blocks.push(block);
    });

    return blocks;
};

