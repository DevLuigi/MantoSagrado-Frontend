import { useNavigate } from "react-router-dom";
import * as S from './styled';

import Button from "../../../components/button/index.js";


export default function ClientProfile() {
    const navigation = useNavigate();

    const goToAddresses = () => {
        navigation("/address/list");
    };

    const goToUpdateProfile = () => {
        navigation("/profile/update");
    };

    const comeback = () => {
        navigation("/");
    };

    return (
        <S.Container>
            <div className="comeback">
                <Button
                    myHeight={6}
                    myWidth={8}
                    myBackgroundColor={"#F3C220"}
                    myColor={"#fffdf9"}
                    myMethod={comeback}
                >
                    Voltar
                </Button>
            </div>

            <S.Logo src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />
            <S.Title>Meu Perfil</S.Title>

            <S.ButtonGroup>
                <S.TransparentButton onClick={goToAddresses}>
                    Lista de Endereços
                </S.TransparentButton>
                <S.TransparentButton onClick={goToUpdateProfile}>
                    Atualizar Dados
                </S.TransparentButton>
            </S.ButtonGroup>
        </S.Container>
    );
}
