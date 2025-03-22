import React, { useEffect, useState } from 'react';
import * as S from './styled';
import Button from "../../../../components/button";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

import ProductApi from "../../../../service/admin/productAdmin.js";
import userAdminApi from '../../../../service/admin/userAdmin.js';

const apiUser = new userAdminApi();
const api = new ProductApi();

export default function ProductManagementScreen() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Ativar/Desativar botões de acordo com o grupo do usuário
  const [doNotDisplayStatus, setDoNotDisplayStatus] = useState(false);
  const [doNotDisplayViewProduct, setDoNotDisplayViewProduct] = useState(false);
  const [doNotDisplayButton, setDoNotDisplayButton] = useState(false);

  const navigation = useNavigate();

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const listAllProducts = async () => {
    let response = await api.listAll();

    if (response.status !== 200) {
      toast.warn(response.error);
      console.log(response.message);
      return;
    }

    setProducts(response.data);
  }

  const handleRegister = () => {
    if (apiUser.getUser().userGroup === "ESTOQUISTA") {
      toast.warning("Apenas um admin pode inserir um produto!")
      return;
    }

    navigation("/admin/product/register");
  }

  const handleEdit = (productId) => {
    const product = products.filter(product => product.id === productId);
    Cookies.set("selected-product", JSON.stringify(product), { expires: 1 });
    navigation("/admin/product/update", { state: product });
  };

  const viewProductDetails = (productId) => {
    const product = products.find(product => product.id === productId);
    navigation("/admin/product/productPreview", { state: product });
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'ATIVADO' ? 'DESATIVADO' : 'ATIVADO';

    const confirmChange = window.confirm(`Tem certeza que deseja alterar o status do produto ${productId} para ${newStatus}?`);

    if (!confirmChange) {
      return;
    }

    const response = await api.handleStatus(productId);
    if (response.status !== 204) {
      toast.error(response.error);
      console.log(response.message);
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, status: newStatus } : product
      )
    );

    toast.success(`Produto ${newStatus} com sucesso`);
  };

  const verifyGroup = () => {
    switch (apiUser.getUser().userGroup) {
      case "ADMIN":
        setDoNotDisplayStatus(false);
        setDoNotDisplayViewProduct(false);
        setDoNotDisplayButton(false);
        break;

      case "ESTOQUISTA":
        setDoNotDisplayStatus(true);
        setDoNotDisplayViewProduct(true);
        setDoNotDisplayButton(true);
        break;

      default:
        break;
    }
  }

  const comeBack = () => {
    navigation("/admin/menu");
  }

  useEffect(() => {
    listAllProducts();
    verifyGroup();
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
      <S.Title> Lista de Produtos </S.Title>

      <div className="group-actions">
        <S.SearchBar
          type="text"
          placeholder="Pesquisar por nome ou marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          myHeight={6}
          myWidth={8}
          myMargin={"0em 1em"}
          myBackgroundColor={"#007bff"}
          myColor={"white"}
          myMethod={listAllProducts}
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
            <S.TableHeader>Time</S.TableHeader>
            <S.TableHeader>Temporada</S.TableHeader>
            <S.TableHeader>Marca</S.TableHeader>
            <S.TableHeader>Estoque</S.TableHeader>
            <S.TableHeader>Preço</S.TableHeader>
            <S.TableHeader>Avaliação</S.TableHeader>
            <S.TableHeader>Status</S.TableHeader>
            <S.TableHeader>Ações</S.TableHeader>
          </S.TableRow>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <S.TableRow key={product.id}>
              <S.TableCell>{product.id}</S.TableCell>
              <S.TableCell>{product.name}</S.TableCell>
              <S.TableCell>{product.teamName}</S.TableCell>
              <S.TableCell>{product.season}</S.TableCell>
              <S.TableCell>{product.brand}</S.TableCell>
              <S.TableCell>{product.quantity}</S.TableCell>
              <S.TableCell>{product.price}</S.TableCell>
              <S.TableCell>{product.evaluation}</S.TableCell>
              <S.TableCell>{product.status}</S.TableCell>
              <S.TableCell>
                <S.ActionButton onClick={() => handleEdit(product.id)}>
                  Alterar
                </S.ActionButton>
                <S.ActionButton
                  disabled={doNotDisplayStatus}
                  onClick={() => handleToggleStatus(product.id, product.status)}
                >
                  {product.status === 'ATIVADO' ? 'Desativar' : 'Ativar'}
                </S.ActionButton>
                <S.ActionButton
                  disabled={doNotDisplayViewProduct}
                  onClick={() => viewProductDetails(product.id)}>
                  Visualizar
                </S.ActionButton>
              </S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>

      {/* Botões da paginação */}
      <S.Pagination>
        <S.Pagination>
          <S.PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            {"<"}
          </S.PaginationButton>

          <S.PageNumber>Página {currentPage} de {totalPages}</S.PageNumber>

          <S.PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            {">"}
          </S.PaginationButton>
        </S.Pagination>


      </S.Pagination>
    </S.Container>
  );
}