import React from "react";
import { keys, scales } from "../data/TempConstants";
import { Button, Container, Input, Label, Select } from "./SettingBoard.styles";

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
                    {scales.map((scale: string, index: number) => (
                        <option key={index} value={scale}>
                            {scale}
                        </option>
                    ))}
                </Select>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="key">Key : </Label>
                <Select id="key" value={settings.key} onChange={handleKeyChange}>
                    {keys.map((key: string, index: number) => (
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
