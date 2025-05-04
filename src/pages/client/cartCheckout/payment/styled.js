import styled from "styled-components";

const PagamentoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  min-height: 100dvh;

  background: rgb(40, 40, 40);
  background: linear-gradient(rgb(39, 35, 49) 0%, imprgb(24, 23, 24) 100%);
`;

const Titulo = styled.h2`
  font-size: 1.5rem;
  color: #f3f3f3;
  margin-bottom: 1rem;
`;

const Metodo = styled.div`
  border: 2px solid ${({ selecionado }) => (selecionado ? "#F3C220" : "#ccc")};
  background-color: #f3f3f3;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #F3C220;
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
  margin: 20px 0px;
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

const GroupButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-top: 1em;
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
  GroupButton
};
