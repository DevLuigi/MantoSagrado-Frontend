import React, { useEffect, useState} from "react";
import * as S from './styled';
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Cookies from "js-cookie";
import {ShoppingCartIcon} from "lucide-react";

export default function Header(props) {
    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        return Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
    });

    const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    useEffect(() => {
        Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
      }, [cart]);

    return (
        <S.Container>
            <S.Logo src="/assets/images/icon_logo.png" alt="logo-image" />

            <S.NavWrapper>
                <S.NavLinks>
                    <a>Login</a>
                    <a>Cadastrar</a>
                </S.NavLinks>

                <S.CartIcon onClick={() => navigate("/cart")} style={{ position: 'relative' }}>
                    {cart.length > 0 ? (
                        <ShoppingCartIcon size={24} />
                    ) : (
                        <ShoppingCart size={24} />
                    )}
                    {cart.length > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                fontSize: "12px",
                            }}
                        >
                            {calculateTotalItems()}
                        </div>
                    )}
                </S.CartIcon>

            </S.NavWrapper>
        </S.Container>
    );
}