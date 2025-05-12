import React, { useEffect, useState } from "react";
import * as S from './styled';
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ShoppingCartIcon, User, LogOut, LogIn } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Header({ cart }) {
    const [isLogged, setIsLogged] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm(`Tem certeza que deseja sair?`);
        if (!confirmLogout) {
            return;
        }

        Cookies.remove("user-logged-client");
        setIsLogged(null);

        toast.success("Logout efetuado com sucesso");
        navigate("/login");
    };

    const handleCookie = () => {
        setIsLogged(Cookies.get("user-logged-client"));
    }

    useEffect(() => {
        handleCookie();
    }, [])

    return (
        <S.Container>
            <S.Logo src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />

            <S.NavWrapper>
                <S.NavLinks>
                    {
                        isLogged ?
                            <>
                                <User
                                    size={24}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate("/profile")}
                                />
                                <LogOut
                                    size={24}
                                    style={{ cursor: "pointer" }}
                                    onClick={handleLogout}
                                /> 
                            </>
                        :
                            <LogIn 
                                size={24}
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/login")}
                            />
                    }
                    <S.CartIcon onClick={() => navigate("/cart")} style={{ position: 'relative' }}>
                        {cart.length > 0 ? (
                            <ShoppingCartIcon size={24} />
                        ) : (
                            <ShoppingCart size={24} />
                        )}
                        {cart.length > 0 && (
                            <S.ItemCount>{cart.length}</S.ItemCount>
                        )}
                    </S.CartIcon>
                </S.NavLinks>
            </S.NavWrapper>
        </S.Container>
    );
}