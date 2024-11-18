import React from "react";
import {
    PositionMarkContainer,
    PositionMarkWrapper,
    Container,
    Dot,
} from "./PositionMark.styles";

interface PositionMarkProps {
    normalizedFretWidths: number[];
    positionMarkFrets: number[];
    maxFret: number;
}

const PositionMark: React.FC<PositionMarkProps> = ({
    normalizedFretWidths,
    positionMarkFrets,
    maxFret,
}) => {
    return (
        <PositionMarkContainer>
            {normalizedFretWidths.slice(0, maxFret).map((width, index) => (
                <PositionMarkWrapper key={index} width={width}>
                    {positionMarkFrets.includes(index + 1) && (
                        <PositionMarkItem $isDouble={index + 1 === 12} />
                    )}
                </PositionMarkWrapper>
            ))}
        </PositionMarkContainer>
    );
};

export default PositionMark;

interface PositionMarkItemProps {
    $isDouble?: boolean;
}

const PositionMarkItem: React.FC<PositionMarkItemProps> = ({ $isDouble }) => {
    return (
        <Container $isDouble={$isDouble}>
            {$isDouble ? (
                <>
                    <Dot />
                    <Dot />
                </>
            ) : (
                <Dot />
            )}
        </Container>
    );
};
