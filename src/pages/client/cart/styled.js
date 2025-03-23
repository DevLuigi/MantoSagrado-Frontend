import styled from "styled-components";

// Estilos com Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;



const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const CartContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #c82333;
  }
`;

const TotalPrice = styled.h3`
  text-align: right;
  color: #28a745;
`;

export { Container,  ProductList, ProductButton, CartContainer, CartItem, RemoveButton, TotalPrice, Button }