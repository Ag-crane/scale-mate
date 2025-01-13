import styled from "styled-components";

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #282c34;
    color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    padding-top: 80px; /* 내부 컨텐츠가 헤더 아래쪽에서 시작하도록 */
`;

const Sidebar = styled.aside`
    width: 280px;
    min-width: 240px;
    background-color: #fafafa;
    border-right: 1px solid #ddd;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto; /* 스크롤이 생기면 사이드바 내부만 스크롤되도록 할 수도 있음 */
`;

// 메인 컨텐츠: 프렛보드를 크게 차지
const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    overflow-x: hidden; /* 필요에 따라 스크롤 설정 */
    overflow-y: auto; /* 필요에 따라 스크롤 설정 */

    /* 예시: 백그라운드 컬러 조정 */
    background-color: #f4f4f4;
`;

export {
    Header,
    LayoutContainer,
    MainContent,
    Sidebar
};
