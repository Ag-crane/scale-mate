import React from "react";
import { ScaleInfoWrapper, ScaleName, ScaleNotes } from "./ScaleInfo.styles";
import { generateScaleNotes } from "../../utils/scales";

interface ScaleInfoProps {
	settings: {
        bpm: number;
        scale: string;
        key: string;
        subdivision: number;
    };
}

const ScaleInfo: React.FC<ScaleInfoProps> = ({ settings }) => {
	const { key, scale } = settings;
    const notes = generateScaleNotes(key, scale);

    return (
        <ScaleInfoWrapper>
            <ScaleName>
                {key} {scale} Scale :
            </ScaleName>
            <ScaleNotes>{notes.join(" - ")}</ScaleNotes>
        </ScaleInfoWrapper>
    );
};

export default ScaleInfo;
