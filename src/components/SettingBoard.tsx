import React, { useEffect, useState } from "react";
import { keys, scales } from "../data/Constants";
import { Button, Container, Input, Label, Select } from "./SettingBoard.styles";

interface SettingBoardProps {
    settings: {
        bpm: number;
        scale: string;
        key: string;
    };
    onSettingsChange: (
        newSettings: Partial<{ bpm: number; scale: string; key: string }>
    ) => void;
}

const SettingBoard: React.FC<SettingBoardProps> = ({
    settings,
    onSettingsChange,
}) => {
    const [tempSettings, setTempSettings] = useState(settings); // 임시 상태로 초기화

    // settings가 변경될 때 tempSettings를 업데이트
    useEffect(() => {
        setTempSettings(settings); // 외부에서 settings가 변경되면 tempSettings도 업데이트
    }, [settings]);

    const handleScaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTempSettings({ ...tempSettings, scale: event.target.value, key: '-' }); // 스케일 변경 시 key를 '-'로 설정
    };

    const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTempSettings({ ...tempSettings, key: event.target.value });
    };

    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTempSettings({ ...tempSettings, bpm: Number(value) || 0 });
    };

    const handleSave = () => {
        onSettingsChange(tempSettings); // Save 버튼 클릭 시 변경 사항을 반영
    };

    return (
        <Container>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="scale">Scale : </Label>
                <Select id="scale" value={tempSettings.scale} onChange={handleScaleChange}>
                    {scales.map((scale: string, index: number) => (
                        <option key={index} value={scale}>
                            {scale}
                        </option>
                    ))}
                </Select>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="key">Key : </Label>
                <Select id="key" value={tempSettings.key} onChange={handleKeyChange}>
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
                    value={tempSettings.bpm}
                    onChange={handleBpmChange}
                    min="40"
                    max="240"
                />
            </div>
            <Button onClick={handleSave}>Save</Button>
        </Container>
    );
};

export default SettingBoard;
