import styled from "styled-components";

const VolumeControlContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
`;

const VolumeLabel = styled.label`
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
`;

const VolumeSlider = styled.input.attrs({ type: "range" })`
    width: 150px;
    -webkit-appearance: none;
    background: #ccc;
    height: 5px;
    border-radius: 5px;
    outline: none;
    transition: background 0.3s;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        background: #444;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.3s;
    }

    &::-moz-range-thumb {
        width: 15px;
        height: 15px;
        background: #444;
        border-radius: 50%;
        cursor: pointer;
    }

    &:hover {
        background: #bbb;
    }
`;

export { VolumeControlContainer, VolumeLabel, VolumeSlider };
