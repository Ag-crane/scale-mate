import React from "react";
import styled from "styled-components";
import { keys, scales } from "../data/constants";

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

const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: rgb(40, 44, 52, 0.5);
    color: white;

    &:hover {
        background-color: rgb(40, 44, 52, 1);
    }
`;

interface SettingBoardProps {
    settings: {
        bpm: number;
        scale: string;
        key: string;
    };
    onSettingsChange: (newSettings: Partial<{ bpm: number; scale: string; key: string }>) => void;
}

const SettingBoard: React.FC<SettingBoardProps> = ({
    settings,
    onSettingsChange,
}) => {
    const handleScaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSettingsChange({ scale: event.target.value });
    };

    const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSettingsChange({ key: event.target.value });
    };

    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onSettingsChange({ bpm: Number(value) || 0 });
    };

    return (
        <Container>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="scale">Scale : </Label>
                <Select
                    id="scale"
                    value={settings.scale}
                    onChange={handleScaleChange}
                >
                    {scales.map((scale, index) => (
                        <option key={index} value={scale}>
                            {scale}
                        </option>
                    ))}
                </Select>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="key">Key : </Label>
                <Select id="key" value={settings.key} onChange={handleKeyChange}>
                    {keys.map((key, index) => (
                        <option key={index} value={key}>
                            {key}
                        </option>
                    ))}
                </Select>
            </div>
            <div>
                <Label htmlFor="bpm">BPM : </Label>
                <Input
                    type="number"
                    id="bpm"
                    value={settings.bpm}
                    onChange={handleBpmChange}
                    min="40"
                    max="240"
                />
            </div>
            <Button onClick={() => onSettingsChange(settings)}>Save</Button>
        </Container>
    );
};



export default SettingBoard;
