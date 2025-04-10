import styled from "styled-components";

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
    height: 10vh;

    background-color: rgb(39, 35, 49);
    color: white;
    border-bottom: 1px solid #ffff;
`;

const Logo = styled.img`
    height: 5em;
`;

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const NavLinks = styled.nav`
    display: flex;

    a {
        text-decoration: none;
        color: white;
        font-weight: bold;
        font-size: 1em;
        transition: opacity 0.3s;
        margin-right: 1em;

        &:hover {
            cursor: pointer;
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