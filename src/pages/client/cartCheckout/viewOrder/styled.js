
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgb(40,40,40);
  background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);

  min-height: 100dvh;

  color: #f3f3f3;
`;

export const Section = styled.div`
  margin-bottom: 1.5em;
  width: 83%;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 0.75rem;
    border-bottom: 1px solid #ddd;
  }
`;

export const InfoLine = styled.p`
  margin: 0.25rem 0;
`;

export const Total = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const TextGroup = styled.div`
   width: 83%;
`;