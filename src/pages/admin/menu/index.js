import { useNavigate } from "react-router-dom";
import { Button, Container, Title } from "./styled";
import { toast } from "react-toastify";

import AdminApi from "../../../service/admin/userAdmin";
const api = new AdminApi();

export default function Menu() {
    const navigation = useNavigate();

    const handleListarProdutos = () => {
        toast.warn("Em desenvolvimento...");
    };
    
    const handleListarUsuarios = () => {
        const user = api.getUser();
    
        if (user.userGroup !== "ADMIN") {
          toast.warn("Essa pagina é exclusivamente para administradores");
          return;
        }

        navigation("/admin/management");
    };
    
    const handleListarPedidos = () => {
        toast.warn("Em desenvolvimento...");
    };

    return (
        <Container>
          <Title>Bem-vindo ao Sistema</Title>
          <Button onClick={handleListarProdutos}>Listar Produtos</Button>
          <Button onClick={handleListarUsuarios}>Listar Usuários</Button>
          <Button onClick={handleListarPedidos}>Listar Pedidos</Button>
        </Container>
      );
}