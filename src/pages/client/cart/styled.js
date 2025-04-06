import styled from "styled-components";

// Estilos com Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100dvh;

  background: rgb(40,40,40);
  background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);

  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CartContainer = styled.div`
  width: 75%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  margin-bottom: 3em;

  & > hr {
    margin: 1em 0em;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;

  & > .cart-item-info {
    display: flex;
    flex-direction: row;
    
    & > span {
      margin: 0em 1em;
    }
  }

  & > .cart-item-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0em 1em;

    & > .trash {
      cursor: pointer;
    }

    & > .price {
      font-size: 1.2em;
      font-weight: 700;
    }
  }
`;

const TotalPrice = styled.h3`
  text-align: right;
  color: #f3f3f3;
`;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80dvh;
`;

const TextEmptyCart = styled.p`
  font-size: 5em;
  font-weight: 700;
  color: #f3f3f3;
`;

const TitleShippingCost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > h4 {
    color: #f3f3f3;
    margin: 0px;
    margin-left: .5em;
  }
`;

const SearchShippingCost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ShippingCostOptions = styled.div`
  margin: 1em 0em;
`;

const ShippingCostItem = styled.div`
  display: flex;
  flex-direction: row;

  & > img {
    height: 3em;
    width: 3em;
  }

  & > p {
    color: #f3f3f3;
  }
`;

export { 
  Container, 
  EmptyCart, 
  TextEmptyCart, 
  ProductList,
  CartContainer, 
  CartItem, 
  TotalPrice, 
  TitleShippingCost,
  SearchShippingCost,
  ShippingCostOptions,
  ShippingCostItem
}