import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Button from "../../../components/button";
import * as S from './styled';

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = Cookies.get("cart");
    console.log(savedCart);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

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

  const handleCheckout = () => {
      toast.success("Compra finalizada com sucesso!");
      navigation("/");
  }

  const comeBack = () => {
    navigation("/");
  };

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  return (
      <S.Container>
        <Button
          myHeight={6}
          myWidth={8}
          myMargin={"1em"}
          myBackgroundColor={"#F3C220"}
          myColor={"white"}
          myMethod={comeBack}
        >
          Voltar
        </Button>
    
        {cart.length === 0 ? (
          <S.EmptyCart>
            <S.TextEmptyCart>Oops!!! O carrinho está vazio ☹️</S.TextEmptyCart>
          </S.EmptyCart>
        ) : (
          <S.CartContainer>
            {cart.map((item, i) => (
              <S.CartItem key={item.id}>
                <img
                  src={item.previewUrl}
                  alt={`Preview ${i}`}
                  style={{
                    width: '10vw',
                    height: '20vh',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
                <div>
                  <span>
                    {item.name} {item.teamName} {item.kitType} {item.season} - R${item.price} x{" "}
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </span>
                </div>
                <Button
                  myHeight={6}
                  myWidth={8}
                  myMargin={"0em 1em"}
                  myBackgroundColor={"red"}
                  myColor={"white"}
                  myMethod={() => removeFromCart(item.id)}
                >
                  Remover
                </Button>
              </S.CartItem>
            ))}
            <S.TotalPrice>Total: R${calculateTotal()}</S.TotalPrice>
            <Button
              myHeight={6}
              myWidth={12}
              myBackgroundColor={"#F3C220"}
              myColor={"white"}
              myMethod={handleCheckout}
            >
              Finalizar Compra
            </Button>
          </S.CartContainer>
        )}
      </S.Container>
    );
    
}