import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 92dvh;
  padding: 2em;
  background: linear-gradient(135deg, rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Comeback = styled.div`
  height: 1em;
  width: 95%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1em;
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

const Logo = styled.img`
    height: 10em;
    width: 10em;
`;

export { Container, Title, ButtonGroup, Logo, Comeback, Content };