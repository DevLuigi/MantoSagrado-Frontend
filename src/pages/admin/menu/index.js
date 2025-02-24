import { useNavigate } from "react-router-dom";
import { Button, Container, Title } from "./styled";
import { toast } from "react-toastify";

export default function Menu() {
    const navigation = useNavigate();

    const handleListarProdutos = () => {
        toast.warn("Em desenvolvimento...");
    };
    
    const handleListarUsuarios = () => {
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