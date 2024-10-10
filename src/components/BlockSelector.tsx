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
            <BlockButton
                isSelected={selectedBlock === null}
                onClick={() => setSelectedBlock(null)} // null을 선택하면 전체 스케일이 재생됨
            >
                Full
            </BlockButton>
            {availableBlocks.map((block) => (
                <BlockButton
                    key={block}
                    isSelected={selectedBlock === block}
                    onClick={() => setSelectedBlock(block)}
                >
                    {block}
                </BlockButton>
            ))}
        </BlockSelectorContainer>
    );
};

export default BlockSelector;
