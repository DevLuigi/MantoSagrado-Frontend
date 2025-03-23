import React, { useEffect, useState } from 'react';
import * as S from './styled';
import Button from "../../../components/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import ProductApi from "../../../service/admin/productAdmin.js";
import Header from '../../../components/header/index.js';
import { newFile } from "../../../service/utils/fileUtils.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const api = new ProductApi();

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // const [id, setId] = useState(0);
  // const [name, setName] = useState("");
  // const [teamName, setTeamName] = useState("");
  // const [season, setSeason] = useState("");
  // const [price, setPrice] = useState("");
  // const [previews, setPreviews] = useState([]);

  const location = useLocation();
  const navigation = useNavigate();

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const listAllProducts = async () => {
    let response = await api.listAll();

    if (response.status !== 200) {
      toast.warn(response.error);
      console.log(response.message);
      return;
    }

    setProducts(response.data);
  }

  const handleProductDetails = (productId) => {
    const product = products.find(product => product.id === productId);
    navigation("/productPreview", { state: product });
  };

  const handleAddToCart = (productId) => {
    const product = products.find(product => product.id === productId);
    navigation("/cart", { state: product });
  };

  // const handleProductInformation = async () => {
  //   if (!location.state) {
  //     return;
  //   }

  //   setId(location.state.id);
  //   setName(location.state.name);
  //   setTeamName(location.state.teamName);
  //   setSeason(location.state.season);
  //   setPrice(location.state.price);

  //   let response = await api.listAllImagesByProduct(location.state.id);
  //   if (response.status !== 200) {
  //     toast.error(response.error);
  //     console.log(response.message);
  //     return;
  //   }

  //   setPreviews(response?.data.map((img, index) => {
  //     const file = newFile(img, index);

  //     return {
  //       "file": file,
  //       "previewUrl": img.imagePath,
  //       "isMain": img.isMain
  //     }
  //   }));
  // }

  useEffect(() => {
    listAllProducts();
    // handleProductInformation();
  }, [])

  return (
    <S.Container>
      <Header />
      <div className="group-actions">
        <S.SearchBar
          type="text"
          placeholder="Pesquisar por nome ou marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <S.Container>
        {filteredProducts.map((product) => (
          <S.Card key={product.id}>
            {/* Carrossel de Imagens
            {product.previews && product.previews.length > 0 && (
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                style={{ width: '100%', height: '200px', marginBottom: '1em' }}
              >
                {product.previews.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.previewUrl}
                      alt={`Preview ${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )} */}

            <S.CardHeader>
              <S.CardTitle>{product.name}</S.CardTitle>
              <S.CardSubtitle>{product.teamName}</S.CardSubtitle>
            </S.CardHeader>

            <S.CardBody>
              <S.CardText><strong>Temporada:</strong> {product.season}</S.CardText>
              <S.CardText><strong>Preço:</strong> {product.price}</S.CardText>
            </S.CardBody>

            {/* Botões: Comprar e Detalhes */}
            <S.Button onClick={() => handleProductDetails(product.id)}>Detalhes</S.Button>
            <S.Button onClick={() => handleAddToCart(product.id)}>Comprar</S.Button>
          </S.Card>
        ))}
      </S.Container>

    </S.Container>
  );
}