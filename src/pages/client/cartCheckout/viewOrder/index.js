import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./styled";

import AuthBox from "../../../../components/auth-box";
import Button from "../../../../components/button";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import orderApi from "../../../../service/client/order";
import clientApi from "../../../../service/client/client";

const api = new orderApi();
const userApi = new clientApi();

export default function ViewOrder() {
    const [total, setTotal] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [installmentAmount, setInstallmentAmount] = useState(0);

    const userLogged = Cookies.get("user-logged-client") ? JSON.parse(Cookies.get("user-logged-client")) : null;
    const products = JSON.parse(Cookies.get("cart"));
    const shippingCost = JSON.parse(Cookies.get("shipping-cost"))[0];
    const deliveryAddress = JSON.parse(Cookies.get("delivery-address"));
    const payment = {...JSON.parse(Cookies.get("payment-method"))};

    const navigation = useNavigate();

    const verifyCookies = () => {
        if (Object.keys(userLogged).length === 0){
            toast.error("Você não está logado. Faça login para continuar.");
            navigation("/login");
            return false;
        }

        if (Object.keys(products).length === 0){
            toast.error("Carrinho vazio. Adicione produtos ao carrinho.");
            navigation("/cart");
            return false;
        }

        if (Object.keys(shippingCost).length === 0){
            toast.error("Selecione o tipo de frete.");
            navigation("/cart");
            return false;
        }

        if (Object.keys(deliveryAddress).length === 0){
            toast.error("Selecione o endereço de entrega.");
            navigation("/cart/checkout/address");
            return false;
        }

        if (Object.keys(payment).length === 0){
            toast.error("Selecione a forma de pagamento.");
            navigation("/cart/checkout/payment");
            return false;
        }

        return true;
    }
    
    const completePurchase = async () => {
        const user = await userApi.listById(userLogged.id);

        let responseOrder = await api.register({ 
            "totalPrice" : total, 
            shippingCost : shippingCost.price, 
            "address": deliveryAddress, 
            "client": user.data, 
            payment : payment.method.id,
            "status": "AGUARDANDO_PAGAMENTO"
        });

        console.log(responseOrder.data);

        for (let product of products) {
            await api.registerOrderItems({
              "product": product,
              "quantity": product.quantity,
              "unitPrice": product.price,
              "order": responseOrder.data
            });
          }          

        if (responseOrder.status !== 200) {
            toast.warn(responseOrder.error);
            console.log(responseOrder.message);
            return;
        }
        
        Cookies.remove('cart');
        Cookies.remove('shipping-cost');
        Cookies.remove('delivery-address');
        Cookies.remove('payment-method');
        
        toast.success(`Pedido de número ${responseOrder.data.id} no valor de R$ ${responseOrder.data.totalPrice} foi gerado com sucesso`);
        navigation('/');
    }

    const calcTotal = () => {
        const totalProducts = products.reduce((total, product) => {
            return total + Number(product.price) * Number(product.quantity);
        }, 0);
        setTotalProducts(totalProducts);
        
        const shippingPrice = Math.round(Number(shippingCost.price) * 100) / 100;
        setTotal(totalProducts + shippingPrice);

        const installmentAmount = Math.round((totalProducts + shippingPrice) / Number(payment.info.parcelas) * 100) / 100; 
        setInstallmentAmount(installmentAmount);
    } 

    const comeBack = () => {
        const confirmCancel = window.confirm(`Tem certeza que deseja voltar?`);
        if (!confirmCancel) {
            return;
        }

        navigation('/cart/checkout/payment');
    }

    useEffect(() => {
        verifyCookies();

        calcTotal();
    }, [])

    return (
        <S.Container>
            <AuthBox
                myWidth={50}
                myHeight={60}
                myBackgroundColor={"#26232c"}>
                <S.Section>
                    <S.Title>Produtos no Carrinho</S.Title>
                    <S.Table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Valor Unitário</th>
                                <th>Quantidade</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <tr>
                                        <td> {product.name} </td>
                                        <td>R${product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>R${product.price * product.quantity}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </S.Table>
                </S.Section>
                <S.TextGroup>
                    <S.Section>
                        <S.Title>Frete</S.Title>
                        <S.InfoLine><strong>Tipo: </strong>{shippingCost.name}</S.InfoLine>
                        <S.InfoLine><strong>Valor: </strong>R${shippingCost.price}</S.InfoLine>
                    </S.Section>

                    <S.Section>
                        <S.Title>Forma de Pagamento</S.Title>
                        <S.InfoLine>
                            {payment.method.titulo} 
                            {
                                payment.method.id === 'CARTAO' 
                                    ? ' (Final ' + payment.info.numeroCartao.slice(-3) + ')'
                                    : ''
                            }
                        </S.InfoLine>
                        <S.InfoLine>
                            {
                                payment.method.id === 'CARTAO' 
                                    ? 'Parcelado em ' + payment.info.parcelas + 'x de R$'+ installmentAmount
                                    : ''
                            }
                        </S.InfoLine>
                    </S.Section>

                    <S.Section>
                        <S.Title>Endereço: {deliveryAddress.identification}</S.Title>
                        <S.InfoLine>{deliveryAddress.neighborhood}</S.InfoLine>
                        <S.InfoLine>{deliveryAddress.streetAddress}, {deliveryAddress.number} – {deliveryAddress.complement}</S.InfoLine>
                        <S.InfoLine>{deliveryAddress.city} – {deliveryAddress.uf} – {deliveryAddress.cep}</S.InfoLine>
                    </S.Section>

                    <S.Section>
                        <S.Title>Valores totais</S.Title>
                        <S.InfoLine>Produtos: R$ {totalProducts}</S.InfoLine>
                        <S.InfoLine>Frete: R$ {shippingCost.price}</S.InfoLine>
                        <S.InfoLine>Geral: R$ {total}</S.InfoLine>
                    </S.Section>
                </S.TextGroup>

                <S.ButtonsContainer>
                    <Button
                        myHeight={6}
                        myWidth={12}
                        myMargin={"0em 0em 2em 0em"}
                        myBackgroundColor={"#F3C220"}
                        myColor={"white"}
                        myMethod={comeBack} >Voltar</Button>
                    <Button
                        myHeight={6}
                        myWidth={12}
                        myMargin={"0em 0em 2em 0em"}
                        myBackgroundColor={"#F3C220"}
                        myColor={"white"}
                        myMethod={completePurchase} >Concluir Compra</Button>
                </S.ButtonsContainer>
            </AuthBox>

        </S.Container>
    );
}
