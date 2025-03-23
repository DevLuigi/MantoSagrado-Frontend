import * as S from './styled';
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Header(props) {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.Logo src="/assets/images/icon_logo.png" alt="logo-image" />

            <S.NavWrapper>
                <S.NavLinks>
                    <a>Login</a>
                    <a>Cadastrar</a>
                </S.NavLinks>

                <S.CartIcon onClick={() => navigate("/cart")}>
                    <ShoppingCart size={24} />
                </S.CartIcon>
            </S.NavWrapper>
        </S.Container>
    );
}