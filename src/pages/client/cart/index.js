import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "./styled";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import * as S from './styled';


export default function Cart() {
    // Estados
    const [cart, setCart] = useState(() => {
      const savedCart = Cookies.get("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    });
  
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();
  
    // Atualizar cookies ao modificar o carrinho
    useEffect(() => {
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    }, [cart]);
  
    // Adicionar ao carrinho
    const addToCart = async (id, name, price) => {
      setLoading(true);
      try {
        // await api.addProduct(id, name, price); // Simulando requisição
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === id);
          if (existingItem) {
            return prevCart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            return [...prevCart, { id, name, price, quantity: 1 }];
          }
        });
        toast.success(`${name} adicionado ao carrinho!`);
      } catch (error) {
        toast.error("Erro ao adicionar produto!");
      }
      setLoading(false);
    };
  
    // Remover do carrinho
    const removeFromCart = async (id) => {
      setLoading(true);
      try {
        // await api.removeProduct(id); // Simulando requisição
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        toast.warn("Produto removido!");
      } catch (error) {
        toast.error("Erro ao remover produto!");
      }
      setLoading(false);
    };
  
    // Atualizar quantidade
    const updateQuantity = (id, quantity) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );
    };
  
    // Calcular total
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    return (
      <S.Container>
        <h2>Produtos</h2>
        <S.ProductList>
          <S.ProductButton onClick={() => addToCart(1, "Camisa", 50)}>
            Adicionar Camisa - R$50
          </S.ProductButton>
          <S.ProductButton onClick={() => addToCart(2, "Boné", 30)}>
            Adicionar Boné - R$30
          </S.ProductButton>
        </S.ProductList>
  
        <h2>Carrinho</h2>
        <S.CartContainer>
          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            cart.map((item) => (
              <S.CartItem key={item.id}>
                <span>
                  {item.name} - R${item.price} x{" "}
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                </span>
                <S.RemoveButton onClick={() => removeFromCart(item.id)}>Remover</S.RemoveButton>
              </S.CartItem>
            ))
          )}
          <S.TotalPrice>Total: R${calculateTotal()}</S.TotalPrice>
          <S.Button onClick={() => navigate("/checkout")}>Finalizar Compra</S.Button>

        </S.CartContainer>
      </S.Container>
    );
  }
  