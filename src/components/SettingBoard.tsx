import React, { useState } from "react";
import styled from "styled-components";

interface SettingBoardProps {
    scales: string[];
    defaultBpm?: number;
}

const Container = styled.div`
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
`;

const Label = styled.label`
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
`;

const Select = styled.select`
    padding: 5px;
    font-size: 16px;
`;

const Input = styled.input`
    padding: 5px;
    font-size: 16px;
    width: 60px;
    text-align: center;
`;

const SettingBoard: React.FC<SettingBoardProps> = ({
    scales,
    defaultBpm = 60,
}) => {
    const [selectedScale, setSelectedScale] = useState<string>(scales[0]);
    const [bpm, setBpm] = useState<number>(defaultBpm);

    const handleScaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedScale(event.target.value);
    };

    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBpm(Number(event.target.value));
    };

    return (
        <Container>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="scale">Select Scale : </Label>
                <Select
                    id="scale"
                    value={selectedScale}
                    onChange={handleScaleChange}
                >
                    {scales.map((scale, index) => (
                        <option key={index} value={scale}>
                            {scale}
                        </option>
                    ))}
                </Select>
            </div>

            <div>
                <Label htmlFor="bpm">BPM : </Label>
                <Input
                    type="number"
                    id="bpm"
                    value={bpm}
                    onChange={handleBpmChange}
                    min="40"
                    max="240"
                />
            </div>
        </Container>
    );
};

export default SettingBoard;
