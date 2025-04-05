import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './styled';
import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';
import Button from '../../../components/button/index.js';

import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductApi from "../../../service/admin/productAdmin.js";
const api = new ProductApi();

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const navigation = useNavigate();
  const sectionRef = useRef(null);

  const filteredProducts = products?.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.season?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleProductImages = async () => {
    console.log(products);
    if (products.length === 0) {
      console.log("Não há produtos para carregar imagens");
      return;
    }
    const updatedProducts = await Promise.all(products.map(async (product, index) => {
      let response = await api.listAllImagesByProduct(product.id);

      if (response.status !== 200) {
        console.log(response.message);
        return product; // Retorna o produto sem alterações se falhar
      }

      const images = response?.data.map((img, i) => ({
        ...img,
        isMain: index === i
      }));

      return {
        ...product,
        previewUrl: images[0]?.imagePath // Pegando a URL da primeira imagem
      };
    }));

    setImagesLoaded(true);
    setProducts(updatedProducts);
  };

  const handleProductDetails = (productId) => {
    const product = products.find(product => product.id === productId);
    navigation("/product/ClientPreview", { state: product });
  };

  const handleAddToCart = (productId) => {
    const product = products.find((product) => product.id === productId);
    if (!product) {
      toast.warning("Produto não encontrado");
      return;
    }

    let cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];

    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });

    // toast.success(`${product.name} do ${product.teamName} adicionado ao carrinho!`);
  };

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    listAllProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && !imagesLoaded) {
      handleProductImages();
    }
  }, [products]);

  return (
    <S.Container>
      <Header />

      <div className='content-home'>
        <S.HeroSection>
            <S.HeroSectionText>
                <h1> Vista a Paixão pelo Futebol com o <span>Manto Sagrado!</span> </h1>
                <p> Camisetas oficiais e personalizadas dos maiores clubes do mundo. Qualidade, tradição e amor pelo futebol em um só lugar. </p>
                <S.Button onClick={scrollToSection}> Ver produtos </S.Button>
            </S.HeroSectionText>
            <S.HeroSectionLogo> 
                <img src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image"/>
            </S.HeroSectionLogo>
        </S.HeroSection>
        <S.ProductSection ref={sectionRef}>
          <div className="group-actions">
            <S.SearchBar
              type="text"
              placeholder="Pesquisar por nome ou marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Swiper
            modules={[Navigation]}
            navigation={{ enabled: true }}
            spaceBetween={1}
            slidesPerView={4}
            loop={true}
            grabCursor={true}
            effect="fade"
            style={{ width: '90%', height: '70dvh', marginBottom: '1em' }}
          >
            {filteredProducts.map((img, index) => (
              <SwiperSlide key={index}>
                <S.Card key={products.id}>
                  <S.CardHeader>
                    <img
                      src={img.previewUrl}
                      alt={`Preview ${index}`}
                      style={{ width: '100%', height: '30dvh', objectFit: 'cover', borderRadius: '10px' }}
                    />
                  </S.CardHeader>

                  <S.CardBody>
                    <S.CardTitle>{img.name}</S.CardTitle>
                    <S.CardSubtitle>{img.teamName}</S.CardSubtitle>
                    <S.CardText><strong>Temporada:</strong> {img.season}</S.CardText>
                    <S.CardText><strong>Preço: </strong> R$ {img.price}</S.CardText>
                  </S.CardBody>

                  {/* Botões: Comprar e Detalhes */}
                  <S.Button onClick={() => handleProductDetails(img.id)}>Detalhes</S.Button>
                  <S.Button onClick={() => handleAddToCart(img.id)}>Comprar</S.Button>
                </S.Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </S.ProductSection>
      </div>
    
      <Footer />
    </S.Container>
  );
}