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
    position: absolute;
    top: 80px; // 헤더 높이만큼 내려서 시작
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const SidebarToggleButton = styled.button<{ isOpen: boolean }>`
    position: absolute;
    top: 50%;
    transform: ${({ isOpen }) =>
        isOpen ? "translate(150px, -50%)" : "translate(180px, -50%)"};
        
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

    svg {
        // 화살표 아이콘
        font-size: 18px;
        color: #333;
    }
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
    position: fixed;
    top: 80px; // 헤더 높이
    left: 0;
    width: 300px;
    height: calc(100vh - 80px);
    background-color: #fafafa;
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: transform 0.3s ease;
    transform: ${({ isOpen }) =>
        isOpen ? "translateX(0)" : "translateX(-100%)"};
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "280px" : "0")};
    transition: margin-left 0.3s ease;
`;

export { Header, LayoutContainer, MainContent, SidebarToggleButton, Sidebar };
