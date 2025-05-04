import React, { useEffect, useState } from 'react';
import * as S from './styled';
import Button from "../../../../components/button/index.js";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import orderApi from '../../../../service/client/order';
import clientApi from '../../../../service/client/client';

const api = new orderApi();
const userApi = new clientApi();

export default function MyOrders() {
    const navigation = useNavigate();
    const [orders, setOrders] = useState([]);

    const orderStatus = {
        "AGUARDANDO_PAGAMENTO": "Aguardando pagamento",
        "PAGO": "Pago"
    }

    const listAllOrders = async () => {
        const userLogged = await userApi.getUserClient();

        if (Object.keys(userLogged).length === 0) {
            toast.error("Faça login para acessar essa página.");
            navigation("/login");
            return;
        }

        const client = await userApi.listById(userLogged.id);

        const response = await api.listAllByClient(client.data);

        if (response.status !== 200) {
            toast.warn(response.error);
            console.log(response.message);
            return;
        }

        setOrders(response.data);
    }

    const viewOrderDetails = (order) => {
        navigation("/profile/orders/details", { state: { order } });
    };

    const comeBack = () => {
        navigation("/profile");
    }

    useEffect(() => {
        listAllOrders();
    }, []);

    return (
        <S.Container>
            <Button
                myHeight={6}
                myWidth={8}
                myBackgroundColor={"#f3c220"}
                myColor={"#f3f3f3"}
                myMethod={comeBack}
            >
                Voltar
            </Button>
            <S.Title> Lista de Pedidos </S.Title>

            <div className="group-actions">
                <Button
                    myHeight={6}
                    myWidth={8}
                    myMargin={"0em 1em"}
                    myBackgroundColor={"#f3c220"}
                    myColor={"#f3f3f3"}
                    myMethod={listAllOrders}
                >
                    ↻
                </Button>
            </div>

            <S.Table>
                <thead>
                    <S.TableRow>
                        <S.TableHeader>Número</S.TableHeader>
                        <S.TableHeader>Valor total</S.TableHeader>
                        <S.TableHeader>Status</S.TableHeader>
                        <S.TableHeader>Data</S.TableHeader>
                        <S.TableHeader>Ações</S.TableHeader>
                    </S.TableRow>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <S.TableRow key={order.id}>
                            <S.TableCell>{order.id}</S.TableCell>
                            <S.TableCell>{order.totalPrice}</S.TableCell>
                            <S.TableCell>{orderStatus[order.status]}</S.TableCell>
                            <S.TableCell>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</S.TableCell>
                            <S.TableCell>
                                <S.ActionButton onClick={() => viewOrderDetails(order)}>
                                    Detalhes
                                </S.ActionButton>
                            </S.TableCell>
                        </S.TableRow>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
}