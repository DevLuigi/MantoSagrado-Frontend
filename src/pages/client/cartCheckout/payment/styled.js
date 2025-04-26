import styled from "styled-components";

const PagamentoContainer = styled.div`
  background: rgb(40, 40, 40);
  background: linear-gradient(rgb(39, 35, 49) 0%, imprgb(24, 23, 24) 100%);
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;

  min-height: 100dhv;
`;

const Titulo = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Metodo = styled.div`
  border: 2px solid ${({ selecionado }) => (selecionado ? "#ff6600" : "#ccc")};
  background-color: ${({ selecionado }) => (selecionado ? "#fff7f0" : "#fff")};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff6600;
  }
`;

const Texto = styled.div`
  display: flex;
  flex-direction: column;
`;

const TituloMetodo = styled.span`
  font-weight: bold;
`;

const Descricao = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const FormCartao = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;


const Botao = styled.button`
  margin-top: 20px;
  padding: 12px;
  font-size: 1rem;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #e65c00;
  }
`;

export {
  PagamentoContainer,
  Titulo,
  Metodo,
  Texto,
  TituloMetodo,
  Descricao,
  FormCartao,
  Input,
  Select,
  Botao
};
