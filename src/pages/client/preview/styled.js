import styled from "styled-components";
import { useState } from "react";
import { Star } from "lucide-react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #fffdf9;

    height: 100%;
    width: 100%;
  
  .container {
    width: 80%;
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  h1 {
    background: #4299e1;
  color: white;
  width: 88%;
  padding: 12px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 16px;
  }
  
  .product-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  
  .product-image {
    flex: 1;
    text-align: center;
  }
  
  .product-image img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .product-details {
    flex-direction: column;
    align-itens: center;
    padding-left: 20px;
  }
  
  .product-details h2 {
    color: #333;
    margin-top: 0;
  }
  
  .product-details p {
    margin: 5px 0;
  }
  
  .product-details .price {
    font-size: 1.3em;
    color:rgb(0, 0, 0);
  }
  
  .product-details .rating {
    color:rgb(0, 0, 0);
  }
  
  .product-details .quantity {
    color: rgb(0, 0, 0);
  }
  
  .product-details .buy-button {
    background-color: #008000;
    color: #fff;
    align-itens: center;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }
  
  .product-details .buy-button:hover {
    background-color: #006400;
    &:disabled {
    background: #2d3748;  // Cinza mais escuro quando desativado
    color: #718096;  // Texto mais apagado
    cursor: not-allowed;
  }
  }  
    
  .avaliacao{
  display: flex;
  flex-direction: row;
  }
  
  .avaliacao>p{
  margin-right: .5em
  }
  
  .comeback{
  display: flex;
  justify-content: start;
  width: 100%;
  margin-top: 1em;
  margin-left: 1em;
  }`

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 10px;
`;

const StarIcon = styled(Star)`
  color: ${(props) => (props.filled ? "#FFD700" : "#555")};
  cursor: pointer;
  transition: color 0.3s;
  } 
`;

export { Container, StarContainer, StarIcon };

