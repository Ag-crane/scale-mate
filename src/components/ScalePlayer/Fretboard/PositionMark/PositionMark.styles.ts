import styled from "styled-components";

const PositionMarkContainer = styled.div`
    display: flex;
    width: 1000px;
    position: relative;
    background-color: white;
    box-sizing: border-box;
    margin-left: 55px;
    margin-top: 10px;
`;

const PositionMarkWrapper = styled.div<{ width: number }>`
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${({ width }) => width}%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid lightgray;
`;

const Container = styled.div<{ isDouble?: boolean }>`
    display: flex;
    flex-direction: ${({ isDouble }) => (isDouble ? "row" : "column")};
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Dot = styled.div`
    width: 6px;
    height: 6px;
    background-color: black;
    border-radius: 50%;
    margin: 0 4px;
`;

export { PositionMarkContainer, PositionMarkWrapper, Container, Dot };
