import React from "react";
import { fretboard, openNotes } from "../../../data/constants";
import {
    FretboardContainer,
    GuitarContainer,
    GuitarString,
    Note,
    NoteRow,
    OpenNote,
    OpenNotesContainer,
} from "./Fretboard.styles";
import PositionMark from "./PositionMark/PositionMark";
import FretNumber from "./FretNumber/FretNumber";

interface FretboardProps {
    currentPlayingNotes: boolean[][];
    scaleNotes: (string | null)[][];
    rootNote: string;
    selectedBlock: number | null;
    blockNumbers: (number | null)[][][];
    scale: string;
}

const Fretboard: React.FC<FretboardProps> = ({
    currentPlayingNotes,
    scaleNotes,
    rootNote,
    selectedBlock,
    blockNumbers,
    scale,
}) => {
    const maxFret = scale === "Chromatic" ? 12 : 16;

    const positionMarkFrets = [3, 5, 7, 9, 12, 15];
    const fretWidths = [
        100, 97, 94, 91, 88, 85, 82, 79, 76, 73, 70, 67, 64, 61, 58, 55,
    ];
    const currentFretWidths = fretWidths.slice(0, maxFret);
    const totalWidth = currentFretWidths.reduce((sum, width) => sum + width, 0);
    const normalizedFretWidths = currentFretWidths.map((width) =>
        parseFloat(((width / totalWidth) * 100).toFixed(4))
    );

    const stringThickness = [4.42, 3.5, 2.67, 2, 1.33, 1];

    return (
        <>
            <GuitarContainer>
                <FretNumber normalizedFretWidths={normalizedFretWidths} maxFret={maxFret} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <OpenNotesContainer>
                        {openNotes.map((note: string, index: number) => (
                            <OpenNote key={index}>
                                <div>{note.replace(/[0-9]/g, "")}</div>
                            </OpenNote>
                        ))}
                    </OpenNotesContainer>
                    <FretboardContainer>
                        {fretboard.map((row: string[], rowIndex: number) => (
                            <NoteRow key={rowIndex}>
                                <GuitarString
                                    $thickness={stringThickness[rowIndex] * 1.3}
                                />
                                {row.map((note: string, colIndex: number) => {
                                    if (colIndex >= maxFret) return null;

                                    const isActive =
                                        currentPlayingNotes[rowIndex][colIndex];
                                    const isScaleNote =
                                        !!scaleNotes[rowIndex][colIndex];
                                    const isRootNote =
                                        rootNote !== "" &&
                                        !!scaleNotes[rowIndex][
                                            colIndex
                                        ]?.startsWith(rootNote); // rootNote가 빈 문자열인 경우 처리
                                    const blockNumber =
                                        blockNumbers[rowIndex][colIndex];

                                    return (
                                        <Note
                                            key={colIndex + 1}
                                            $isActive={isActive}
                                            $isScaleNote={isScaleNote}
                                            $isRootNote={isRootNote}
                                            $selectedBlock={selectedBlock}
                                            $blockNumber={blockNumber}
                                            $fretWidths={normalizedFretWidths}
                                            $fretIndex={colIndex}
                                        >
                                            <div>
                                                {note.replace(/[0-9]/g, "")}
                                            </div>
                                        </Note>
                                    );
                                })}
                            </NoteRow>
                        ))}
                    </FretboardContainer>
                </div>
                <PositionMark
                    normalizedFretWidths={normalizedFretWidths}
                    positionMarkFrets={positionMarkFrets}
                    maxFret={maxFret}
                />
            </GuitarContainer>
        </>
    );
};

export default Fretboard;
