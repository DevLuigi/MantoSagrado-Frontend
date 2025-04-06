import styled from "styled-components";

const QuantityWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 32px;
  text-align: center;
  font-size: 16px;
  border: none;
  outline: none;
  -moz-appearance: textfield;

  /* Remove setinhas do input number em Chrome */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export { QuantityButton, QuantityInput, QuantityWrapper }