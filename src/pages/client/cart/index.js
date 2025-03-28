import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Button from "../../../components/button";
import * as S from './styled';

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = Cookies.get("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const removeFromCart = async (id) => {
    setLoading(true);
    try {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    } catch (error) {
      toast.error("Erro ao remover produto!");
    }
    setLoading(false);
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const comeBack = () => {
    navigate("/");
  };

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  return (
    <S.Container>
      <Button
        myHeight={6}
        myWidth={8}
        myBackgroundColor={"#007bff"}
        myColor={"white"}
        myMethod={comeBack}
      >
        Voltar
      </Button>

      <h2>Carrinho</h2>
      <S.CartContainer>
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <S.CartItem key={item.id}>
              <span>
                {item.name} {item.teamName} {item.kitType} {item.season} - R${item.price} x{" "}
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />
              </span>
              <S.RemoveButton onClick={() => removeFromCart(item.id)}>
                Remover do carrinho
              </S.RemoveButton>
            </S.CartItem>
          ))
        )}
        <S.TotalPrice>Total: R${calculateTotal()}</S.TotalPrice>
        <S.Button onClick={() => navigate("/checkout")}>Finalizar Compra</S.Button>
      </S.CartContainer>
    </S.Container>
  );
}