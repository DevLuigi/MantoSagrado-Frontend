import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import * as S from "./styled";

import AuthBox from "../../../../components/auth-box";
import Button from "../../../../components/button";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import orderApi from "../../../../service/client/order";
import clientApi from "../../../../service/client/client";

const api = new orderApi();
const userApi = new clientApi();

export default function OrderDetails() {
    const [total, setTotal] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [installmentAmount, setInstallmentAmount] = useState(0);

    const [products, setProducts] = useState([]);
    const [shippingCost, setShippingCost] = useState(0);
    const [deliveryAddress, setDeliveryAddress] = useState({});
    const [payment, setPayment] = useState("");

    const userLogged = Cookies.get("user-logged-client") ? JSON.parse(Cookies.get("user-logged-client")) : null;

    const navigation = useNavigate();
    const location = useLocation();

    const handleOrderInformation = async () => {
        verifyCookies();

        const order = await api.listByIdAndClient(location.state.order.id, userLogged.id);
        
        if (order.status !== 200) {
            toast.error(order.error);
            console.log(order.message);
            return;
        }

        const responseProducts = await api.listAllByOrder(order.data);

        setProducts(responseProducts.data);
        setShippingCost(order.data.shippingCost);
        setDeliveryAddress(order.data.address);
        setPayment(order.data.payment);
        setTotal(order.data.totalPrice);
    }

    const verifyCookies = () => {
        if (Object.keys(userLogged).length === 0) {
            toast.error("Você não está logado. Faça login para continuar.");
            navigation("/login");
            return false;
        }
        return true;
    }

    const calcTotal = () => {
        if (!products || products.length === 0) return;
    
        const totalProducts = products.reduce((total, product) => {
            return total + (Number(product?.unitPrice) * Number(product?.quantity || 0));
        }, 0);

        setTotalProducts(totalProducts);
    };    

    const comeBack = () => {
        navigation('/profile/orders');
    }

    useEffect(() => {
        handleOrderInformation();
    }, [])

    useEffect(() => {
        calcTotal();
    }, [products]);

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
                                        <td> {product.product?.name} </td>
                                        <td>R${product?.unitPrice}</td>
                                        <td>{product?.quantity}</td>
                                        <td>R${product?.unitPrice * product?.quantity}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </S.Table>
                </S.Section>
                <S.TextGroup>
                    <S.Section>
                        <S.Title>Frete</S.Title>
                        <S.InfoLine><strong>Valor: </strong>R${shippingCost}</S.InfoLine>
                    </S.Section>

                    <S.Section>
                        <S.Title>Endereço: {deliveryAddress?.identification}</S.Title>
                        <S.InfoLine>{deliveryAddress?.neighborhood}</S.InfoLine>
                        <S.InfoLine>{deliveryAddress?.streetAddress}, {deliveryAddress?.number} – {deliveryAddress?.complement}</S.InfoLine>
                        <S.InfoLine>{deliveryAddress?.city} – {deliveryAddress?.uf} – {deliveryAddress?.cep}</S.InfoLine>
                    </S.Section>

                    <S.Section>
                        <S.Title>Valores totais</S.Title>
                        <S.InfoLine>Produtos: R$ {totalProducts}</S.InfoLine>
                        <S.InfoLine>Frete: R$ {shippingCost}</S.InfoLine>
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
                </S.ButtonsContainer>
            </AuthBox>

        </S.Container>
    );
}
