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

const SidebarToggleButton = styled.button<{ isOpen: boolean }>`
    position: absolute; // 부모인 Sidebar의 우측 끝 중앙에 위치
    top: 50%;
    right: -20px; // 사이드바 우측에서 살짝 떨어짐
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #bbb;
    }

    svg { // 화살표 아이콘
        font-size: 18px;
        color: #333;
    }
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
    position: fixed;
    top: 80px; // 헤더 높이
    left: 0;
    width: 280px;
    height: calc(100vh - 80px);
    background-color: #fafafa;
    border-right: 1px solid #ddd;
    padding: 20px;
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) =>
        isOpen ? "translateX(0)" : "translateX(-100%)"};
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "280px" : "0")};
    transition: margin-left 0.3s ease;
    background-color: #f4f4f4;
`;

export { Header, LayoutContainer, MainContent, SidebarToggleButton, Sidebar };
