import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

export { Container, Title, Content }