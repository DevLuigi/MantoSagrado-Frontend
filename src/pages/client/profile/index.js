import { useNavigate } from "react-router-dom";
import * as S from './styled';

import Button from "../../../components/button/index.js";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ClientProfile() {
    const navigation = useNavigate();

    const verifyCookie = () => {
        const userLogged = JSON.parse(Cookies.get("user-logged-client"));
        if (Object.keys(userLogged).length === 0) {
            toast.error("Faça login para acessar essa página.");
            navigation("/login");
            return;
        }
    }

    const goToAddresses = () => {
        navigation("/address/list");
    };

    const goToUpdateProfile = () => {
        navigation("/profile/update");
    };

    const goToMyOrders = () => {
        navigation("/profile/orders");
    };

    const comeback = () => {
        navigation("/");
    };

    useEffect(() => {
        verifyCookie();
    }
    , []);

    return (
        <S.Container>
            <S.Comeback>
                <Button
                    myHeight={6}
                    myWidth={8}
                    myBackgroundColor={"#F3C220"}
                    myColor={"#fffdf9"}
                    myMethod={comeback}
                >
                    Voltar
                </Button>
            </S.Comeback>

            <S.Content>
                <S.Logo src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />
                <S.Title>Meu Perfil</S.Title>

                <S.ButtonGroup>
                    <Button 
                        myHeight={8}
                        myWidth={15}
                        myBackgroundColor={"#F3C220"}
                        myColor={"#fffdf9"}
                        myMethod={goToAddresses}
                    >
                        Lista de Endereços
                    </Button>
                    <Button 
                        myHeight={8}
                        myWidth={15}
                        myBackgroundColor={"#F3C220"}
                        myColor={"#fffdf9"}
                        myMethod={goToUpdateProfile}
                    >
                        Atualizar Dados
                    </Button>
                    <Button 
                        myHeight={8}
                        myWidth={15}
                        myBackgroundColor={"#F3C220"}
                        myColor={"#fffdf9"}
                        myMethod={goToMyOrders}
                    >
                        Meus pedidos
                    </Button>
                </S.ButtonGroup>
            </S.Content>
        </S.Container>
    );
}