import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f2f5;
    padding: 20px;
    padding-top: 60px; /* Header의 높이만큼 패딩 추가 */
`;

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between; 
    align-items: stretch; /* 두 컴포넌트의 높이를 동일하게 맞춤 */
    width: 100%;
    max-width: 1200px;
    margin-top: 20px;
`;

const SettingBoardContainer = styled.div`
    flex: 1;
    margin-right: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #ffffff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const MetronomeContainer = styled.div`
    flex: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #ffffff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const ScalePlayerContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    max-width: 1200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #ffffff;
    padding: 20px 0;
`;

const Header = styled.div`
    background-color: #282c34;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

export { Container, SettingBoardContainer, MainContainer, MetronomeContainer, ScalePlayerContainer, Header };