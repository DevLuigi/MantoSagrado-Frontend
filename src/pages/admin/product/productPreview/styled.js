import styled from "styled-components";

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
    text-align: center;
    color: #333;
    margin-bottom: 20px;
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
    font-size: 1.2em;
    font-weight: bold;
    color: #008000;
  }
  
  .product-details .rating {
    color: #ffc107;
  }
  
  .product-details .quantity {
    color: #777;
  }
  
  .product-details .buy-button {
    background-color: #008000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }
  
  .product-details .buy-button:hover {
    background-color: #006400;
  }`

export { Container };

