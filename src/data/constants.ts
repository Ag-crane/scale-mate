const scales = ["Chromatic", "Major", "Minor", "MajorPentatonic", "MinorPentatonic"];

const keys = ['-', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const fretboard = [
    ["F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3"], // 6번 줄
    ["A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4"], // 5번 줄
    ["D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4"], // 4번 줄
    ["G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"], // 3번 줄
    ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5"], // 2번 줄
    ["F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5"], // 1번 줄
];

const openNotes = ["E2", "A2", "D3", "G3", "B3", "E4"];

type ScaleBlockRangesEntry = [number, number][] | Record<string, [number, number][]>;

const scaleBlockRanges: Record<string, ScaleBlockRangesEntry> = {
    Chromatic: [
        [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 10], [8, 11], [9, 12]
    ],
    Major: {
        C: [
            [2, 6], [4, 8], [7, 10], [9, 13], [12, 15]
        ],
        'C#': [
            [3, 7], [5, 9], [8, 11], [10, 14], [13, 16]
        ],
        D: [
            [2, 5], [4, 8], [6, 10], [9, 12], [11, 15]
        ]
        // 나머지 키 추가 예정
    },
};

export { scales, keys, fretboard, openNotes , scaleBlockRanges};