import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Title } from "./styled";
import { toast } from "react-toastify";

import Button from "../../../components/button" 

import AdminApi from "../../../service/admin/userAdmin";
const api = new AdminApi();

export default function Menu() {
    const [doNotDisplayProduct, setDoNotDisplayProduct] = useState(false);
    const [doNotDisplayUser, setDoNotDisplayUser] = useState(false);
    const [doNotDisplaySales, setDoNotDisplaySales] = useState(false);
  
    const navigation = useNavigate();

    const redirectToProducts = () => {
      navigation("/admin/product");
    };
    
    const redirectToUsers = () => {
        navigation("/admin/management");
    };
    
    const redirectToSales = () => {
        toast.warn("Em desenvolvimento...");
    };

    const verifyGroup = () => {
      switch (api.getUser().userGroup) {
        case "ADMIN":
          setDoNotDisplaySales(true);
          break;
      
        case "ESTOQUISTA":
          setDoNotDisplayUser(true);
          break;

        default:
          break;
      }
    }

    useEffect(() => {
      verifyGroup();
    }, [])

    return (
        <Container>
          <Title>Bem-vindo ao Sistema</Title>
          <Button 
            myDoNotDisplay={doNotDisplayProduct}
            myColor={'white'} 
            myBackgroundColor={'#007bff'} 
            myMargin={'1em'}
            myMethod={redirectToProducts}> 
              Listar Produtos 
          </Button>
          <Button 
            myDoNotDisplay={doNotDisplayUser}
            myColor={'white'} 
            myBackgroundColor={'#007bff'}
            myMargin={'1em'} 
            myMethod={redirectToUsers}>
              Listar Usuários
          </Button>
          <Button 
            myDoNotDisplay={doNotDisplaySales}
            myColor={'white'} 
            myBackgroundColor={'#007bff'}
            myMargin={'1em'} 
            myMethod={redirectToSales}>
              Listar Pedidos
          </Button>
        </Container>
      );
}