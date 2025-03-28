import styled from "styled-components";

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;

    background-color: #3498db;
    color: white;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.1);

    width: 100vw;  
    max-width: 100%;
    height: 10vh;
    min-height: 60px;

    margin: 0; 
    padding: 0 2em; 
    box-sizing: border-box;
`;

const Logo = styled.img`
    height: 50px;
`;

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 2em; 
`;

const NavLinks = styled.nav`
    display: flex;
    gap: 1.2em;
    
    a {
        text-decoration: none;
        color: white;
        font-weight: bold;
        font-size: 1em;
        transition: opacity 0.3s;

        &:hover {
            opacity: 0.7;
        }
    }
`;

const CartIcon = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;

    &:hover {
        opacity: 0.7;
    }
`;

export { Container, Logo, NavWrapper, NavLinks, CartIcon };