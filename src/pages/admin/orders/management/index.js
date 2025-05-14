import { useEffect, useState } from 'react';
import * as S from './styled';
import Button from "../../../../components/button";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import OrderAdminApi from "../../../../service/admin/orderAdmin.js";

const api = new OrderAdminApi();

export default function ProductManagementScreen() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const orderStatus = {
    "AGUARDANDO_PAGAMENTO": "Aguardando pagamento",
    "PAGAMENTO_REJEITADO": "Pagamento rejeitado",
    "PAGAMENTO_COM_SUCESSO": "Pagamento com sucesso",
    "AGUARDANDO_RETIRADA": "Aguardando retirada",
    "EM_TRANSITO": "Em trânsito",
    "ENTREGUE": "Entregue"
  };

  const paymentMethods = {
    "PIX": "Pix",
    "BOLETO": "Boleto",
    "CARTAO": "Cartão"
  }

  const navigation = useNavigate();

  const filteredOrders = orders?.filter(
    (order) =>
      (order.client.name.toLowerCase()+' '+order.client.lastName.toLowerCase()).includes(searchTerm.toLowerCase()) ||
      order.client.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      order.payment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const listAllProducts = async () => {
    const response = await api.listAll();

    if (response.status !== 200) {
      toast.warn(response.error);
      console.log(response.message);
      return;
    }

    setOrders(response.data);
  }

  const handleEdit = async (id, status) => {
    const response = await api.updateStatusOrder(id, { status });
    if (response.status !== 200) {
      toast.warn(response.error);
      console.log(response.message);
      return;
    }

    setOrders(prev => {
      const index = prev.findIndex(order => order.id === response.data.id);
      if (index === -1) {
        toast.warn('Falha ao encontrar pedido, atualize a tela');
        return prev;
      }

      const update = [...prev];
      update[index] = response.data 
      return update;
    })

    toast.success(`Status atualizado com sucesso!`);
  }

  const comeBack = () => {
    navigation("/admin/menu");
  }

  useEffect(() => {
    listAllProducts();
  }, [])

  return (
    <S.Container>
      <Button
        myHeight={6}
        myWidth={8}
        myBackgroundColor={"#007bff"}
        myColor={"white"}
        myMethod={comeBack}
      >
        Voltar
      </Button>
      <S.Title> Lista de Pedidos </S.Title>

      <div className="group-actions">
        <S.SearchBar
          type="text"
          placeholder="Pesquisar por cliente, CPF ou forma de pagamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          myHeight={6}
          myWidth={8}
          myMargin={"0em 1em"}
          myBackgroundColor={"#007bff"}
          myColor={"white"}
          myMethod={listAllProducts}
        >
          ↻
        </Button>
      </div>

      <S.Table>
        <thead>
          <S.TableRow>
            <S.TableHeader>Número do pedido</S.TableHeader>
            <S.TableHeader>Data do pedido</S.TableHeader>
            <S.TableHeader>Cliente</S.TableHeader>
            <S.TableHeader>Forma de pagamento</S.TableHeader>
            <S.TableHeader>Valor total</S.TableHeader>
            <S.TableHeader>Status</S.TableHeader>
            <S.TableHeader>Ações</S.TableHeader>
          </S.TableRow>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <S.TableRow key={order.id}>
              <S.TableCell>{order.id}</S.TableCell>
              <S.TableCell>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</S.TableCell>
              <S.TableCell>{order.client.name + ' ' + order.client.lastName + ' - ' + order.client.cpf}</S.TableCell>
              <S.TableCell>{paymentMethods[order.payment]}</S.TableCell>
              <S.TableCell>{order.totalPrice}</S.TableCell>
              <S.TableCell>{orderStatus[order.status]}</S.TableCell>
              <S.TableCell>
                <div>
                  <label htmlFor="select">Alterar status para: </label>
                  <select
                      id="select"
                      onChange={(e) => handleEdit(order.id, e.target.value)}
                  >
                      <option key={1} value={""}>
                          SELECIONE...
                      </option>
                      {Object.keys(orderStatus).map((option, index) => (
                          <option key={index} value={option}>
                              {orderStatus[option]}
                          </option>
                      ))}
                  </select>
                </div>
              </S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
}