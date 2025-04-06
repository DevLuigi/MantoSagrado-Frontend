import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Star, StarHalf } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { Container, StarContainer } from './styled';
import Button from "../../../../components/button";
import AuthBox from '../../../../components/auth-box';

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
  const [products, setProducts] = useState([]);

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
              myWidth={80} myHeight={75}
          >
              <div className="product-preview">
                  <div className="product-image">
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
                      <div>
                          <h2>{name + ' - ' + teamName + ' / ' + season}</h2>
                          <StarContainer>
                              {[...Array(5)].map((_, i) => {
                                  const fullStars = Math.floor(evaluation);
                                  const decimal = evaluation - fullStars;

                                  if (i < fullStars) {
                                      // Estrela completa
                                      return <Star key={i} size={20} fill="yellow" />;
                                  } else if (i === fullStars && decimal >= 0.25 && decimal < 0.75) {
                                      // Meia estrela
                                      return <StarHalf key={i} size={20} fill="yellow" />;
                                  }
                              })}
                          </StarContainer>
                          <p className="price">R$ {price}</p>
                          <p><b>Marca:</b> {brand} </p>
                          <p><b>Tipo de camisa:</b> {kitType} </p>
                          <p><b>Detalhes:</b> {description}</p>
                      </div>
                      <Button  
                          className="buy-button"
                          myHeight={6}
                          myBackgroundColor={"#007bff"}
                          myColor={"white"}
                          myDisabled={true}>
                          Comprar
                      </Button>
                  </div>
              </div>
          </AuthBox>
      </Container>
  );
}