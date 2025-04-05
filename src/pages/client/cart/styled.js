import styled from "styled-components";

// Estilos com Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: rgb(40,40,40);
  background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);

  height: 100dvh;
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

const TotalPrice = styled.h3`
  text-align: right;
  color: #28a745;
`;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

const TextEmptyCart = styled.p`
  font-size: 5em;
  font-weight: 700;
  color: #f3f3f3;
`;

export { Container, EmptyCart, TextEmptyCart, ProductList, ProductButton, CartContainer, CartItem, TotalPrice }