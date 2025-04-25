import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 92dvh;
  padding: 2em;
  background: linear-gradient(135deg, rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  .comeback {
        width: 95%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1em;
    }
`;

const Title = styled.h1`
  color: #F3C220;
  font-size: 2.8em;
  margin-bottom: 3em;
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  justify-content: center;
  flex-wrap: wrap;
`;

const TransparentButton = styled.button`
  background-color: transparent;
  border: 2px solid #F3C220;
  color: #F3C220;
  padding: 1em 2.5em;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 200px;

  &:hover {
    background-color: rgba(243, 194, 32, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  background-color: #F3C220;
  color: white;
  font-size: 16px;
  padding: 6px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  left: 1em;
  top: 2em; /* Ajuste a posição vertical conforme necessário */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5cc4c;
  }

  &:active {
    background-color: #f5cc4c;
  }
`;

const Logo = styled.img`
    height: 5em;
`;

export { Container, Title, ButtonGroup, TransparentButton, Button, Logo };
