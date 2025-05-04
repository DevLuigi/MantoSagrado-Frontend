import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import AuthBox from "../../../../components/auth-box";
import Button from "../../../../components/button";

import * as S from "./styled";

import { toast } from "react-toastify";

export default function Payment() {
  const metodos = [
    { id: "PIX", titulo: "Pix", descricao: "" },
    { id: "BOLETO", titulo: "Boleto bancário", descricao: "" },
    { id: "CARTAO", titulo: "Cartão de crédito", descricao: "" },
  ];

  const [metodoSelecionado, setMetodoSelecionado] = useState(metodos[0]);
  const [form, setForm] = useState({
    numeroCartao: "",
    nomeCompleto: "",
    codigoSeguranca: "",
    vencimento: "",
    parcelas: "",
  });

  const navigation = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!form.numeroCartao) {
      toast.warn("Número do cartão obrigatório");
      return false;
    }

    if (!form.nomeCompleto) {
      toast.warn("Nome completo obrigatório");
      return false;
    }

    if (!form.codigoSeguranca) {
      toast.warn("Código de segurança obrigatório");
      return false;
    }

    if (!form.vencimento) {
      toast.warn("Data de vencimento obrigatória");
      return false;
    }
    if (!form.parcelas) {
      toast.warn("Selecione a quantidade de parcelas");
      return false;
    }

    return true;
  };

  const nextStage = () => {
    if (metodoSelecionado.id?.trim() === "" && metodoSelecionado.id !== "CARTAO") return;
    if (metodoSelecionado.id === "CARTAO" && !validar()) return; 

    toast.success("Pagamento enviado com sucesso!");
    Cookies.set("payment-method", JSON.stringify({ "method": metodoSelecionado, "info": form }));
    navigation("/cart/checkout/view-order");
  };

  const comeBack = async () => {
    const confirmCancel = window.confirm(`Tem certeza que deseja voltar?`);
    if (!confirmCancel) {
        return;
    }

    navigation('/cart/checkout/address');
  }

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
              selecionado={metodoSelecionado.id === metodo.id}
              onClick={() => setMetodoSelecionado(metodo)}
            >
              <S.Texto>
                <S.TituloMetodo>{metodo.titulo}</S.TituloMetodo>
                {metodo.descricao && (
                  <S.Descricao>{metodo.descricao}</S.Descricao>
                )}
              </S.Texto>
            </S.Metodo>
          ))}

          {metodoSelecionado.id === "CARTAO" && (
            <S.FormCartao onSubmit={nextStage}>
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
                  <option value="6">6x Sem Juros</option>
                  <option value="12">12x Sem Juros</option>
                </S.Select>
              </div>
            </S.FormCartao>
          )}
        </div>
        <S.GroupButton>
          <Button 
            myHeight={6}
            myWidth={17.5}
            myMargin={"0em 1em 1em 0em"}
            myBackgroundColor={"#F3C220"}
            myColor={"white"}
            myMethod={comeBack}
          >
            Voltar
          </Button>
          <Button 
            myHeight={6}
            myWidth={17.5}
            myMargin={"0em 0em 1em 0em"}
            myBackgroundColor={"#F3C220"}
            myColor={"white"}
            myMethod={nextStage}
          >
            Avançar
          </Button>
        </S.GroupButton>
      </AuthBox>
    </S.PagamentoContainer>
  );
}