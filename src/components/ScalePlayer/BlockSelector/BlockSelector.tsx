import React from "react";
import { BlockSelectorContainer, BlockButton } from "./BlockSelector.styles";

interface BlockSelectorProps {
    selectedBlock: number | null;
    setSelectedBlock: (block: number | null) => void;
    availableBlocks: number[];
    isPlaying: boolean;
}

const BlockSelector: React.FC<BlockSelectorProps> = ({
    selectedBlock,
    setSelectedBlock,
    availableBlocks,
    isPlaying,
}) => {
    return (
        <BlockSelectorContainer>
            <BlockButton
                isSelected={selectedBlock === null}
                onClick={() => setSelectedBlock(null)}
                disabled={isPlaying}
            >
                Full
            </BlockButton>
            {availableBlocks.map((block) => (
                <BlockButton
                    key={block}
                    isSelected={selectedBlock === block}
                    onClick={() => setSelectedBlock(block)}
                    disabled={isPlaying}
                >
                    {block}
                </BlockButton>
            ))}
        </BlockSelectorContainer>
    );
};

export default BlockSelector;
