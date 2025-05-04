import styled from 'styled-components';

// Container principal
export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);
  min-height: 100vh;
  color: #f0f0f0;

  .group-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1em;
  }
`;

// Título da tela
export const Title = styled.h1`
  color: #f3c220;
  margin-bottom: 20px;
`;

// Barra de consulta
export const SearchBar = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #555;
  border-radius: 4px;
  font-size: 16px;
  background-color: #2a2a2a;
  color: #f0f0f0;
  outline: none;

  &:focus {
    border-color: #f3c220;
    box-shadow: 0 0 5px rgba(243, 194, 32, 0.5);
  }
`;

// Tabela
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Cabeçalho da tabela
export const TableHeader = styled.th`
  background-color: #f3c220;
  color: #f3f3f3;
  padding: 10px;
  text-align: left;
`;

// Linha da tabela
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #2e2b36;
  }
`;

// Célula da tabela
export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #444;
  color: #f0f0f0;
`;

// Botão de ação
export const ActionButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#555' : '#f3c220')};
  color: ${(props) => (props.disabled ? '#aaa' : '#f3f3f3')};
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#555' : '#e5b800')};
  }

  &:active {
    background-color: ${(props) => (props.disabled ? '#555' : '#c9a100')};
  }
`;

// Paginação da tela
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

// Número da página
export const PageNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #f0f0f0;
  margin: 0 10px;
`;