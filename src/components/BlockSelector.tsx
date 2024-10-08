import React from "react";
import { BlockSelectorContainer, BlockButton } from "./BlockSelector.styles";

interface BlockSelectorProps {
    selectedBlock: number | null;
    setSelectedBlock: (block: number | null) => void;
    availableBlocks: number[];
}

const BlockSelector: React.FC<BlockSelectorProps> = ({
    selectedBlock,
    setSelectedBlock,
    availableBlocks,
}) => {
    return (
        <BlockSelectorContainer>
            {availableBlocks.map((block) => (
                <BlockButton
                    key={block}
                    isSelected={selectedBlock === block}
                    onClick={() => setSelectedBlock(block)}
                >
                    Block {block}
                </BlockButton>
            ))}
        </BlockSelectorContainer>
    );
};

export default BlockSelector;
