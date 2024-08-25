import React, { useState } from "react";
import styled from "styled-components";

interface SettingBoardProps {
    scales: string[];
    keys: string[];
    defaultBpm: number;
    onBpmChange: (bpm: number) => void;
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

const SettingBoard: React.FC<SettingBoardProps> = ({
    scales,
    keys,
    defaultBpm,
    onBpmChange,
}) => {
    const [selectedScale, setSelectedScale] = useState<string>(scales[0]);
    const [selectedKey, setSelectedKey] = useState<string>(keys[0]);
    const [bpm, setBpm] = useState<number>(defaultBpm);

    const handleScaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedScale(event.target.value);
    };

    const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedKey(event.target.value);
    };

    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === "" || Number(value) === 0) {
            setBpm(0);
        } else {
            const newBpm = Number(value);
            setBpm(newBpm);
        }
    };

    const handleSave = () => {
        // 저장 버튼을 눌렀을 때 현재 BPM을 부모 컴포넌트로 전달
        onBpmChange(bpm);
    };

    return (
        <Container>
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="scale">Scale : </Label>
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
            <div style={{ marginBottom: "20px" }}>
                <Label htmlFor="key">Key : </Label>
                <Select id="key" value={selectedKey} onChange={handleKeyChange}>
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
                    value={bpm}
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
