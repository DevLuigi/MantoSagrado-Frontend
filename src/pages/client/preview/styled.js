import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: rgb(40,40,40);
    background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);

    height: 100dvh;
    padding-left: 1em;
  
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
    flex-direction: row;
    align-items: center;

    height: 100%;
    width: 100%;
  }
  
  .product-image {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50%;
  }
  
  .product-image img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .product-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    height: 25em;
    width: 50%;

    margin-right: 2em;
  }
  
  .product-details h2 {
    font-size: 2em;
    font-weight: 700;
    margin: 0.2em 0em;
  }
  
  .product-details p {
    margin: 1em 0;
  }
  
  .product-details .price {
    font-size: 2em;
    font-weight: 700;
    margin: .5em 0em;
  }
  
  .product-details .buy-button {
    width: 100%;
  }
    
  .avaliacao {
    display: flex;
    flex-direction: row;
  }
  
  .avaliacao > p {
    margin-right: .5em;
  }
  
  .comeback {
    display: flex;
    justify-content: start;
    width: 100%;

    margin-bottom: 2em;
  }`

const StarContainer = styled.div`
    display: flex;
    gap: 4px;
    margin-bottom: 10px;
`;


export { Container, StarContainer };

