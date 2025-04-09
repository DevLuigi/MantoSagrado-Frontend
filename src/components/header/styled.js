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
    & > * {
        margin: 0em .6em;
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

const ItemCount = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #F3C220;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: bold;
`;

export { Container, Logo, NavWrapper, NavLinks, CartIcon, ItemCount };