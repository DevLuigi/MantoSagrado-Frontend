import React from "react";
import * as S from './styled';
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ShoppingCartIcon, User, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Header({ cart }) {
    const navigate = useNavigate();

    const isLogged = Cookies.get("user-logged");

    const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleLogout = () => {
        Cookies.remove("user-logged");
        toast.success("Logout efetuado com sucesso");
        navigate("/");
    };

    return (
        <S.Container>
            <S.Logo src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />

            <S.NavWrapper>
                <S.NavLinks>
                {!isLogged ? (
                        <>
                            <a onClick={() => navigate("/login")}>Login</a>
                            <a onClick={() => navigate("/register")}>Cadastrar</a>
                        </>
                    ) : (
                        <>
                            <User
                                size={24}
                                color="#F3C220"
                                style={{ cursor: "pointer", marginRight: "1em" }}
                                onClick={() => navigate("/profile")}
                            />
                            <LogOut
                                size={24}
                                color="#F3C220"
                                style={{ cursor: "pointer" }}
                                onClick={handleLogout}
                            />
                        </>
                    )}
                </S.NavLinks>

                <S.CartIcon onClick={() => navigate("/cart")} style={{ position: 'relative' }}>
                    {cart.length > 0 ? (
                        <ShoppingCartIcon size={24} />
                    ) : (
                        <ShoppingCart size={24} />
                    )}
                    {cart.length > 0 && (
                        <S.ItemCount>{calculateTotalItems()}</S.ItemCount>
                    )}
                </S.CartIcon>

            </S.NavWrapper>
        </S.Container>
    );
}