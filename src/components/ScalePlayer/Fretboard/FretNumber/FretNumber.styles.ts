import styled from "styled-components";

const FretNumberContainer = styled.div`
    display: flex;
    width: 1000px;
    position: relative;
    background-color: white;
    box-sizing: border-box;
    margin-left: 55px;
    margin-bottom: 10px;
`;

const FretNumberWrapper = styled.div<{ width: number }>`
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${({ width }) => width}%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid lightgray;
    font-size: 13px;
`;

export { FretNumberContainer, FretNumberWrapper };