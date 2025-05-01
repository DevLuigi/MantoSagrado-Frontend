import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { Trash2, Truck } from "lucide-react";
import { toast } from "react-toastify";

import ShippingSelector from "../../../components/shipping-selector"
import Input from "../../../components/input";
import Button from "../../../components/button";
import CartButton from "../../../components/cart-button";

import * as S from './styled';

import ShippingCostApi from "../../../service/client/shippingCost.js";
const api = new ShippingCostApi();

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = Cookies.get("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  
  });
  const [shippingCostOptions, setShippingCostOptions] = useState([]);
  const [selectedShippingCost, setSelectedShippingCost] = useState([]);
  const [cep, setCep] = useState("");
  const [total, setTotal] = useState(0);
  

  const navigation = useNavigate();

  const removeFromCart = async (id) => {
    try {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    } catch (error) {
      toast.error("Erro ao remover produto!");
    }
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      
      Cookies.set("cart", JSON.stringify(newCart), { expires: 7 });
  
      calcTotal(newCart);
      return newCart;
    });
  };

  const calcTotal = (cartToUse = cart) => {
    const value = cartToUse.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = shippingCostOptions.find(item => item.id === selectedShippingCost);
    const shipping = shippingCost ? Number(shippingCost.price) : 0;
    setTotal(value + shipping);
  };

  const handleCheckout = async () => {
    const userLogged = await api.getUserClient();
    if(Object.keys(userLogged).length === 0){
      toast.warn("Deve ser logado para finalizar compra");
      Cookies.set("cartDone", JSON.stringify({"isDone":true}), { expires: 1 });
      navigation("/login");
      return;
    }

    if (cart.length <= 0) {
      toast.warn("Carrinho vazio, selecione um produto antes de finalizar a compra");
      return;
    }

    if (selectedShippingCost.length <= 0) {
      toast.warn("Selecione um frete antes de finalizar a compra");
      return;
    }

    navigation("/cart/checkout/payment");
  }

  const handleShippingCost = async (cep) => {
    if (!cep) {
      toast.warn("Digite um CEP antes de consultar");
      setShippingCostOptions([]);
      return;
    }

    const products = cart.map((item) => {
      return {
        "id": String(item.id),
        "width": 1,
        "height": 1,
        "length": 1,
        "weight": 1,
        "insurance_value": item.price,
        "quantity": item.quantity
      }
    });

    const body = {
      "from": {
          "postal_code": "04824010"
      },
      "to": {
          "postal_code": cep
      },
      "products": products,
      "options": {
          "receipt": false,
          "own_hand": false
      },
      "services": ""
    }

    const response = await api.shippingCostCalc(body);
    if (response.status !== 200) {
      toast.error(response.error);
      console.log(response.message);
      return;
    }

    const options = response?.data.filter((option) => option.price).slice(0, 3);
    setShippingCostOptions(options);
  }

  const comeBack = () => {
    navigation("/");
  };

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  useEffect(() => {
    calcTotal();
  }, [selectedShippingCost])

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
    
        {cart && cart.length === 0 ? (
          <S.EmptyCart>
            <S.TextEmptyCart>Oops!!! O carrinho está vazio ☹️</S.TextEmptyCart>
          </S.EmptyCart>
        ) : (
          <section>
            <S.CartContainer>
              {cart.map((item, i) => (
                <S.CartItem key={item.id}>
                  <div className="cart-item-info">
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
                    <span>
                      <h2>{item.name + ' - ' + item.teamName + ' / ' + item.season}</h2>
                      <CartButton item={item} updateQuantity={updateQuantity}/>
                    </span>
                  </div>
                  
                  <div className="cart-item-action">
                    <Trash2 
                      className="trash"
                      onClick={() => removeFromCart(item.id)}
                    />
                    <p className="price">R${item.price}</p>
                  </div>
                </S.CartItem>
              ))}
              <hr />
              <S.TitleShippingCost>
                <Truck color="#f3f3f3"/>
                <h4> Meios de envio </h4>
              </S.TitleShippingCost>
              <S.SearchShippingCost>
                  <Input 
                    myGetter={cep} 
                    mySetter={setCep} 
                    myMargin={"0em 2em 0em 0em"} 
                    myHeight={6} 
                    myWidth={10}
                    myPlaceHolder={"CEP"}
                    myHideText={true}
                  > 
                  </Input>
                  <Button
                      myHeight={5}
                      myWidth={8}
                      myMargin={".5em 0em 0em 0em"}
                      myBackgroundColor={"#F3C220"}
                      myColor={"#f3f3f3"}
                      myMethod={() => handleShippingCost(cep)}
                  >
                    Consultar 
                  </Button>
              </S.SearchShippingCost>
              {
                  shippingCostOptions.length > 0 ? (
                    <S.ShippingCostOptions>
                      <ShippingSelector
                        options={shippingCostOptions}
                        selectedOption={selectedShippingCost}
                        onChange={setSelectedShippingCost}
                        onClick={() => calcTotal()}
                      />
                    </S.ShippingCostOptions>
                  ) : ''
              }
              <hr />
              <S.TotalPrice>Total: R${total}</S.TotalPrice>
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
          </section>
        )}
      </S.Container>
    );
    
}