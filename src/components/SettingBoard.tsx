import React, { useEffect, useState } from "react";
import { keys, scales, subdivisionOptions } from "../data/constants";
import { Button, Container, Input, Label, Select } from "./SettingBoard.styles";

interface SettingBoardProps {
    settings: {
        bpm: number;
        scale: string;
        key: string;
        subdivision: number;
    };
    onSettingsChange: (
        newSettings: Partial<{ bpm: number; scale: string; key: string }>
    ) => void;
    onSave: () => void;
}

const SettingBoard: React.FC<SettingBoardProps> = ({
    settings,
    onSettingsChange,
    onSave,
}) => {
    const [tempSettings, setTempSettings] = useState(settings);

    useEffect(() => {
        setTempSettings(settings);
    }, [settings]);

    const handleScaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTempSettings({
            ...tempSettings,
            scale: event.target.value,
            key: "-",
        });
    };

    const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value === "-" ? "" : event.target.value; // '-'일 때는 빈 문자열로 변환
        setTempSettings({ ...tempSettings, key: value });
    };

    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTempSettings({ ...tempSettings, bpm: Number(value) || 0 });
    };

    const handleSubdivisionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const subdivision = Number(event.target.value);
        setTempSettings({ ...tempSettings, subdivision });
    };

    const handleSave = () => {
        if (!isSaveDisabled) {
            onSettingsChange(tempSettings);
            onSave();
        }
    };

    return (
        <Container>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="scale">Scale : </Label>
                <Select
                    id="scale"
                    value={tempSettings.scale}
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
                <Select
                    id="key"
                    value={tempSettings.key}
                    onChange={handleKeyChange}
                    disabled={tempSettings.scale === "Chromatic"}
                >
                    {keys.map((key: string, index: number) => (
                        <option key={index} value={key}>
                            {key}
                        </option>
                    ))}
                </Select>
                    {isSaveDisabled && (
                        <p style={{ color: "red" }}>Please select a key</p>
                    )}
            </div>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="bpm">BPM : </Label>
                <Input
                    type="number"
                    id="bpm"
                    value={tempSettings.bpm}
                    onChange={handleBpmChange}
                    min="40"
                    max="240"
                />
            </div>
            <div>
                <Label htmlFor="subdivision">Subdivision :</Label>
                <Select
                    id="subdivision"
                    value={tempSettings.subdivision}
                    onChange={handleSubdivisionChange}
                >
                    {subdivisionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </div>
            <Button disabled={isSaveDisabled} onClick={handleSave}>
                Save
            </Button>
        </Container>
    );
};

export default SettingBoard;
