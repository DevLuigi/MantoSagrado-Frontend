import React from 'react';
import { Container } from './styled';
import AuthBox from '../../../../components/auth-box';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


import userAdminApi from "../../../../service/admin/userAdmin.js";
import ProductApi from "../../../../service/admin/productAdmin.js";

import { newFile } from "../../../../service/utils/fileUtils.js";

const api = new ProductApi();

export default function ProductPreview() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [season, setSeason] = useState("");
  const [kitType, setKitType] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [evaluation, setEvaluation] = useState(0);
  const [status, setStatus] = useState("");
  const [previews, setPreviews] = useState([]);

  const location = useLocation();
  const navigation = useNavigate();


  const handleUserInformation = async () => {
    if (!location.state) {
      toast.warn("Selecione um produto antes de alterar!");
      navigation("/admin/product/management");
      return;
    }

    setId(location.state.id);
    setName(location.state.name);
    setTeamName(location.state.teamName);
    setSeason(location.state.season);
    setKitType(location.state.kitType);
    setBrand(location.state.brand);
    setDescription(location.state.description);
    setQuantity(location.state.quantity);
    setPrice(location.state.price);
    setEvaluation(location.state.evaluation);
    setStatus(location.state.status);

    let response = await api.listAllImagesByProduct(location.state.id);
    if (response.status !== 200) {
      toast.error(response.error);
      console.log(response.message);
      return;
    }

    setPreviews(response?.data.map((img, index) => {
      const file = newFile(img, index);

      return {
        "file": file,
        "previewUrl": img.imagePath,
        "isMain": img.isMain
      }
    }));
  }

  useEffect(() => {
    handleUserInformation();
  }, [])

  return (
    <Container>
      <AuthBox
        myWidth={40} myHeight={95}
      >
        <h1>
          Preview de produtos
        </h1>
        <div className="product-preview">
          <div>
            {/* Carrossel de Imagens */}
            {previews.length > 0 && (
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                style={{ width: "25em", height: "25em", margin: "2em 0em" }}
              >
                {previews.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.previewUrl}
                      alt={`Preview ${index}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="product-details">
            <h2>{name}</h2>
            <p className="price">{price}</p>
            <p className="rating">{evaluation}</p>
            <p className="quantity">{quantity}</p>
            <button className="buy-button">Comprar</button>
          </div>
        </div>
      </AuthBox>
    </Container>
  );
}