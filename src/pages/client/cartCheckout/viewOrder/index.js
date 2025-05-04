
import * as S from "./styled";
import AuthBox from "../../../../components/auth-box";
import Button from "../../../../components/button";
import { Comeback } from "../../profile/styled";
import { useNavigate } from "react-router-dom";

export default function ViewOrder() {
    const navigation = useNavigate();
    const completePurchase = () => {
        
    }
    const comeBack = () => {
        navigation(-1);
    }

    return (
        <S.Container>
            <AuthBox
                myWidth={25}
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
                            <tr>
                                <td>Camiseta Preta</td>
                                <td>R$ 49,90</td>
                                <td>2</td>
                                <td>R$ 99,80</td>
                            </tr>
                            <tr>
                                <td>Tênis Esportivo</td>
                                <td>R$ 199,00</td>
                                <td>1</td>
                                <td>R$ 199,00</td>
                            </tr>
                            <tr>
                                <td>chuteira</td>
                                <td>R$ 197,99</td>
                                <td>3</td>
                                <td>R$ 593,97</td>
                            </tr>
                        </tbody>
                    </S.Table>
                </S.Section>
                <S.TextGroup>
                    <S.Section>
                        <S.Title>Frete</S.Title>
                        <S.InfoLine><strong>Tipo:</strong> Sedex</S.InfoLine>
                        <S.InfoLine><strong>Valor:</strong> R$ 20,00</S.InfoLine>
                    </S.Section>

                    <S.Section>
                        <S.Title>Endereço de Entrega</S.Title>
                        <S.InfoLine>João da Silva</S.InfoLine>
                        <S.InfoLine>Rua das Flores, 123 – Centro</S.InfoLine>
                        <S.InfoLine>São Paulo – SP – 01000-000</S.InfoLine>
                    </S.Section>

                    <S.Section>
                        <S.Title>Forma de Pagamento</S.Title>
                        <S.InfoLine>Cartão de Crédito - Visa (final 1234)</S.InfoLine>
                        <S.InfoLine>Parcelado em 3x de R$ 121,60</S.InfoLine>
                    </S.Section>

                    <S.Section>
                        <S.Title>Total Geral</S.Title>
                        <S.InfoLine>Produtos: R$ 343,80</S.InfoLine>
                        <S.InfoLine>Frete: R$ 20,00</S.InfoLine>
                        <S.Total>Total: R$ 363,80</S.Total>
                    </S.Section>
                </S.TextGroup>



                <S.ButtonsContainer>
                    <Button
                        myHeight={4}
                        myWidth={10}
                        myMargin={"0em 0em 2em 0em"}
                        myBackgroundColor={"#F3C220"}
                        myColor={"white"}
                        myMethod={Comeback} >Voltar</Button>
                    <Button
                        myHeight={4}
                        myWidth={10}
                        myMargin={"0em 0em 2em 0em"}
                        myBackgroundColor={"#F3C220"}
                        myColor={"white"}
                        myMethod={completePurchase} >Concluir Compra</Button>
                </S.ButtonsContainer>
            </AuthBox>

        </S.Container>
    );
}
