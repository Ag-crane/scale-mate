import styled from "styled-components";

const VolumeControlContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const VolumeButton = styled.button`
    width: 50px;
    height: 40px;
    padding-top: 5px;
    border: #ccc 1px solid;
    border-radius: 5px;
`;

const VolumeSlider = styled.input.attrs({ type: "range" })`
    margin-left: 10px;
    width: 150px;
    -webkit-appearance: none;
    background: #ccc;
    height: 5px;
    border-radius: 5px;
    cursor: pointer;
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

export { VolumeControlContainer, VolumeButton, VolumeSlider };
