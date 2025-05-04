import styled, { css } from 'styled-components';

const CardContainer = styled.div`
  background: #26232c;
  color: #f3f3f3;
  border: 2px solid #f3f3f3;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  
  ${({ selected }) => selected && css`
    border-color: #F3C220;
    background-color: #1f1c24;
  `}

  &:hover {
    border-color: #F3C220;
  }

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
    color: #f3f3f3;
  }
`;

export { CardContainer, TitleRow, Title, Badge, Text, Button };