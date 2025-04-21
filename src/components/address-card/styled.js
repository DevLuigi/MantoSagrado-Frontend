import styled from 'styled-components';

const CardContainer = styled.div`
  background: #26232c;
  color: #f3f3f3;
  border: 1px solid #FFD700;
  padding: 16px;
  border-radius: 8px;

  & > .group-button {
    display: flex;
    justify-content: end;
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
`;

const Badge = styled.span`
  color: #f3f3f3;
  font-weight: bold;
`;

const Text = styled.p`
  margin: 1em 0em;
`;

const Button = styled.button`
  margin-top: 8px;
  background: none;
  border: none;
  color: #aaa;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;

  margin-left: 1em;

  transition: .3s;

  &:hover {
    transition: .3s;
    color: #f3f3f3;
  }
`;

export { CardContainer, TitleRow, Title, Badge, Text, Button }