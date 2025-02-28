import React, { useEffect, useState } from 'react';
import * as S from './styled'; 
import Button  from "../../../components/button";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import AdminApi from "../../../service/admin/userAdmin";
const api = new AdminApi();

export default function UserManagementScreen() {
  const [users, setUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');

  const navigation = useNavigate();

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const listAllUsers = async () => {
      let response = await api.listAll();
      
      if (response.status !== 200) {
          toast.warn(response.error);
          console.log(response.message);
          return;
      }

      setUsers(response.data);
  }

  const handleRegister = () => {
      navigation("/admin/register");
  }

  const handleEdit = (userId) => {
      const user = users.filter(user => user.id === userId);
      navigation("/admin/update", { state: user });
  };

  const handleToggleStatus = async (userId, currentStatus) => {
      const newStatus = currentStatus === 'ATIVADO' ? 'DESATIVADO' : 'ATIVADO';
      
      const confirmChange = window.confirm(`Tem certeza que deseja alterar o status do usuário ${userId} para ${newStatus}?`);
      
      if(!confirmChange){
        return;
      }

      const response = await api.handleStatus(userId);
      if (response.status !== 204) {
        toast.error(response.error);
        console.log(response.message);
        return;
      }

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );

      toast.success(`Usuário ${newStatus} com sucesso`);
  };

  const comeBack = () => {
    navigation("/admin/menu");
  }

  useEffect(() => {
    listAllUsers();
  }, [])

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
      <S.Title> Lista de Usuários </S.Title>

      <div className="group-actions">
          <S.SearchBar
            type="text"
            placeholder="Pesquisar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
              myHeight={6}
              myWidth={8}
              myMargin={"0em 1em"}
              myBackgroundColor={"#007bff"}
              myColor={"white"}
              myMethod={listAllUsers}
            >
              ↻
            </Button>
          <Button
              myHeight={6}
              myWidth={8}
              myMargin={"0em 1em 0em 0em"}
              myBackgroundColor={"#007bff"}
              myColor={"white"}
              myMethod={handleRegister}
            >
              +
            </Button>
      </div>

      <S.Table>
        <thead>
          <S.TableRow>
          <S.TableHeader>Id</S.TableHeader>
            <S.TableHeader>Nome</S.TableHeader>
            <S.TableHeader>Email</S.TableHeader>
            <S.TableHeader>Status</S.TableHeader>
            <S.TableHeader>Ações</S.TableHeader>
          </S.TableRow>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <S.TableRow key={user.id}>
              <S.TableCell>{user.id}</S.TableCell>
              <S.TableCell>{user.name}</S.TableCell>
              <S.TableCell>{user.email}</S.TableCell>
              <S.TableCell>{user.status}</S.TableCell>
              <S.TableCell>
                <S.ActionButton onClick={() => handleEdit(user.id)}>
                  Alterar
                </S.ActionButton>
                <S.ActionButton
                  onClick={() => handleToggleStatus(user.id, user.status)}
                >
                  {user.status === 'ATIVADO' ? 'Desativar' : 'Ativar'}
                </S.ActionButton>
              </S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
}