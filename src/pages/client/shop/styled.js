import styled from 'styled-components';

// Barra de consulta
export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  background-color: #fffdf9;
  height: 100dvh;
  width: 100dvw;
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

export const CardSubtitle = styled.h4`
  font-size: 1rem;
  color: #555;
  margin: 0;
`;

export const CardBody = styled.div`
  font-size: 0.9rem;
`;

export const CardText = styled.p`
  margin: 5px 0;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f8c;
  }
`;