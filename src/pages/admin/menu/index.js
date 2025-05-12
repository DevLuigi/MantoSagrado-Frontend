import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';
import { toast } from "react-toastify";

import Button from "../../../components/button" 
import { Container, Content, Title } from "./styled";

import AdminApi from "../../../service/admin/userAdmin";
const api = new AdminApi();

export default function Menu() {
    const [doNotDisplayProduct, setDoNotDisplayProduct] = useState(false);
    const [doNotDisplayUser, setDoNotDisplayUser] = useState(false);
    const [doNotDisplaySales, setDoNotDisplaySales] = useState(false);
  
    const navigation = useNavigate();

    const redirectToProducts = () => {
      navigation("/admin/product/management");
    };
    
    const redirectToUsers = () => {
        navigation("/admin/user/management");
    };
    
    const redirectToOrders = () => {
        navigation("/admin/order/management");
    };

    const verifyGroup = () => {
      switch (api.getUserAdmin().userGroup) {
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

    const comeBack = () => {
      const confirmLogout = window.confirm(`Tem certeza que deseja sair?`);
      if (!confirmLogout) {
          return;
      }

      Cookies.remove('user-logged-admin');
      navigation("/admin/login");
    }

    useEffect(() => {
      verifyGroup();
    }, [])

    return (
        <Container>
          <Button
            myHeight={6}
            myWidth={8}
            myMargin={"2em 2em"}
            myBackgroundColor={"#007bff"}
            myColor={"white"}
            myMethod={comeBack}
          >
            Sair
          </Button>
          <Content>
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
              myMethod={redirectToOrders}>
                Listar Pedidos
            </Button>
          </Content>
        </Container>
      );
}