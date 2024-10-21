import React from "react";
import { FretNumberContainer, FretNumberWrapper } from "./FretNumber.styles";

interface FretNumberProps {
    normalizedFretWidths: number[];
    maxFret: number;
}

const FretNumber: React.FC<FretNumberProps> = ({
    normalizedFretWidths,
    maxFret,
}) => {
    return (
        <FretNumberContainer>
            {normalizedFretWidths.slice(0, maxFret).map((width, index) => (
                <FretNumberWrapper key={index} width={width}>
                    {index + 1}
                </FretNumberWrapper>
            ))}
        </FretNumberContainer>
    );
};

export default FretNumber;
