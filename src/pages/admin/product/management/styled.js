import styled from 'styled-components';

// Container principal
export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;

  .group-actions {
    display: flex;
    flex-direction: row;
  }
`;

// Título da tela
export const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

// Barra de consulta
export const SearchBar = styled.input`
  width: 90%;
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

// Tabela
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Cabeçalho da tabela
export const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
`;

// Linha da tabela
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

// Célula da tabela
export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

// Botão de ação
export const ActionButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#0056b3')};
  }

  &:active {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#004080')};
  }
`;

// Paginação da tela
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const PageNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 10px;
`;

export const PaginationButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;
