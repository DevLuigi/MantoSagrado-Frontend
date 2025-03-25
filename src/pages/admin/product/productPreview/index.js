import { useEffect, useState } from "react";
import { Container, StarContainer, StarIcon } from './styled';
import AuthBox from '../../../../components/auth-box';
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import Button from "../../../../components/button";
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

  function StarRating({ rating }) {
    return (
      <StarContainer>
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            size={20}
            filled={i < rating}
          />
        ))}
      </StarContainer>
    );
  }

  const comeBack = () => {
    navigation("/admin/product/management");
  }

  useEffect(() => {
    handleUserInformation();
  }, [])

  return (
    <Container>

      <div className="comeback">
        <Button
          myHeight={6}
          myWidth={8}
          myBackgroundColor={"#007bff"}
          myColor={"white"}
          myMethod={comeBack}
        >
          Voltar
        </Button>
      </div>
      <AuthBox
        myWidth={40} myHeight={95}
      >
        <h1>Preview do produto</h1>
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
            <p className="quantity">Estoque: {quantity}</p>
            <p className="price">Preço: R$ {price}</p>
            <div className="avaliacao"><p className="rating">Avaliação:</p>
              {<StarRating rating={evaluation} />}</div>
            <button disabled={true} className="buy-button">Comprar</button>
          </div>
        </div>
      </AuthBox>
    </Container>
  );
}