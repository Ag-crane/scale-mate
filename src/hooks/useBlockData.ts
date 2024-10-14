import { useMemo } from "react";
import { scaleBlockRanges } from "../data/constants";

interface Settings {
    scale: string;
    key: string;
}

type BlockRange = [number, number];

export const useBlockData = (settings: Settings) => {
    const blockRanges = useMemo<BlockRange[]>(() => {
        const blockRangesEntry = scaleBlockRanges[settings.scale];
        if (Array.isArray(blockRangesEntry)) {
            return blockRangesEntry as BlockRange[];
        } else {
            return (blockRangesEntry as Record<string, BlockRange[]>)[settings.key] || [];
        }
    }, [settings.scale, settings.key]);

    const blockNumbers = useMemo<number[][][]>(() => {
        const blockNumbersArray = Array.from({ length: 6 }, () =>
            Array.from({ length: 16 }, () => [] as number[])
        );

        blockRanges.forEach(([startFret, endFret], blockIndex) => {
            for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
                for (let fretIndex = startFret - 1; fretIndex < endFret; fretIndex++) {
                    if (fretIndex >= 0 && fretIndex < 16) {
                        blockNumbersArray[stringIndex][fretIndex].push(blockIndex + 1);
                    }
                }
            }
        });

        return blockNumbersArray;
    }, [blockRanges]);

    return { blockRanges, blockNumbers };
};
