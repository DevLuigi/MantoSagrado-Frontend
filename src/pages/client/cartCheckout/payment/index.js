import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthBox from "../../../../components/auth-box";
import Button from "../../../../components/button";

import * as S from "./styled";

import { toast } from "react-toastify";

export default function Payment() {
  const [metodoSelecionado, setMetodoSelecionado] = useState("PIX");
  const [form, setForm] = useState({
    numeroCartao: "",
    nomeCompleto: "",
    codigoSeguranca: "",
    vencimento: "",
    parcelas: "",
  });

  const metodos = [
    { id: "PIX", titulo: "PIX", descricao: "" },
    { id: "BOLETO", titulo: "BOLETO BANCÁRIO", descricao: "" },
    { id: "CARTAO", titulo: "CARTÃO DE CRÉDITO", descricao: "" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!form.numeroCartao) {
      toast.warn("Número do cartão obrigatório");
      return;
    }

    if (!form.nomeCompleto) {
      toast.warn("Nome completo obrigatório");
      return;
    }

    if (!form.codigoSeguranca) {
      toast.warn("Código de segurança obrigatório");
      return;
    }

    if (!form.vencimento) {
      toast.warn("Data de vencimento obrigatória");
      return;
    }
    if (!form.parcelas) {
      toast.warn("Selecione a quantidade de parcelas");
      return;
    }

    return true;
  };

  const handleSubmit = () => {
    if (metodoSelecionado.trim() !== "" && metodoSelecionado!== "CARTAO"){
      toast.success("Pagamento enviado com sucesso!");
      return;
    }
      
    if (validar() && metodoSelecionado === "CARTAO") {
      toast.success("Pagamento enviado com sucesso!");
    }
  };

  return (
    <S.PagamentoContainer>
      <AuthBox 
        myWidth={60} 
        myHeight={70} 
        myBackgroundColor={"#26232c"}
        myJustifyContent={"space-evenly"}
        >
        <S.Titulo>FORMA DE PAGAMENTO</S.Titulo>

        <div>
          {metodos.map((metodo) => (
            <S.Metodo
              key={metodo.id}
              selecionado={metodoSelecionado === metodo.id}
              onClick={() => setMetodoSelecionado(metodo.id)}
            >
              <S.Texto>
                <S.TituloMetodo>{metodo.titulo}</S.TituloMetodo>
                {metodo.descricao && (
                  <S.Descricao>{metodo.descricao}</S.Descricao>
                )}
              </S.Texto>
            </S.Metodo>
          ))}

          {metodoSelecionado === "CARTAO" && (
            <S.FormCartao onSubmit={handleSubmit}>
              <div>
                <S.Input
                  type="text"
                  placeholder="Número do Cartão"
                  name="numeroCartao"
                  value={form.numeroCartao}
                  onChange={handleChange}
                />
              </div>

              <div>
                <S.Input
                  type="text"
                  placeholder="Nome Completo"
                  name="nomeCompleto"
                  value={form.nomeCompleto}
                  onChange={handleChange}
                />
              </div>

              <div>
                <S.Input
                  type="text"
                  placeholder="Código de Segurança"
                  name="codigoSeguranca"
                  value={form.codigoSeguranca}
                  onChange={handleChange}
                />
              </div>

              <div>
                <S.Input
                  type="month"
                  placeholder="Data de Vencimento"
                  name="vencimento"
                  value={form.vencimento}
                  onChange={handleChange}
                />
              </div>

              <div>
                <S.Select
                  name="parcelas"
                  value={form.parcelas}
                  onChange={handleChange}
                >
                  <option value="">Selecione Parcelas</option>
                  <option value="1">1x Sem Juros</option>
                  <option value="2">2x Sem Juros</option>
                  <option value="3">3x Sem Juros</option>
                  <option value="6">6x Com Juros</option>
                  <option value="12">12x Com Juros</option>
                </S.Select>
              </div>
            </S.FormCartao>
          )}
        </div>
        <Button 
          myHeight={6}
          myWidth={20}
          myMargin={"0em 0em 2em 0em"}
          myBackgroundColor={"#F3C220"}
          myColor={"white"}
          myMethod={handleSubmit}
        >
          Finalizar Pagamento
        </Button>
      </AuthBox>
    </S.PagamentoContainer>
  );
}
