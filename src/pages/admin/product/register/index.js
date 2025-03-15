import { useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


import AuthBox from "../../../../components/auth-box";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

import { Container } from "./styled";

import ProductApi from "../../../../service/admin/productAdmin.js";
const api = new ProductApi();

export default function ProductRegister() {
    const defaultImage = {
        default: true,
        previewUrl: '/assets/images/icon_logo.png'
    }

    const [name, setName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [season, setSeason] = useState("");
    const [kitType, setKitType] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [evaluation, setEvaluation] = useState(0);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([defaultImage]);

    const kitTypeOptions = ["HOME", "AWAY", "THIRD", "GOALKEEPER", "SPECIAL"];
    const evaluationOptions = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

    const navigation = useNavigate();

    const isFormCompleted = Object.values(
        [name, teamName, season, kitType, brand, description]
    ).every((value) => value.trim() !== "");

    const isPriceValid = price.toString().trim() !== "" && !isNaN(price) && Number(price) > 0;
    const isEvaluationValid = evaluation.toString().trim() !== "" && !isNaN(evaluation) && Number(evaluation) > 0 && Number(evaluation) < 6;
    const isMainNotSelected = images.every(img => img.isMain === false);

    const register = async () => {        
        if (!isFormCompleted || !isPriceValid || isMainNotSelected || !isEvaluationValid) {
            toast.warn("Preencha todos os campos !");
            return;
        }

        let response = await api.register({ 
            name, 
            teamName, 
            season, 
            kitType, 
            brand, 
            description, 
            quantity, 
            price,
            evaluation,
            "status": "ATIVADO" 
        });
        
        if(response.status !== 200){
            toast.warn(response.error);
            console.log(response.message);
            return;
        }

        if(await handleImageUpload(response.data.id)) return;

        toast.success("Registro inserido com sucesso!");
        navigation("/admin/product/management");
    }

    const handleFileChange = (event) => {
        if (!event) {
            return;
        }
        
        if (event.target.files[0]?.type !== "image/jpeg") {
            toast.warn("Tipo de imagem inválido, selecione uma image no formato .jpeg");
            return;
        }

        if (previews[0]?.default === true ) {
            setPreviews([]);    
        }
        
        const files = Array.from(event?.target?.files); // Converter FileList em array
        const newPreviews = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
            isMain: false
        }));

        setImages((prevImages) => [...prevImages, ...newPreviews]);
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const handleImageUpload = async (productId) => {
        if (!images) return;

        let response;
        images.forEach(async (img) => {
            const formData = new FormData();
            formData.append("file", img.file);
            response = await api.uploadImage(productId, img.isMain, formData);  
            
            if(response.status !== 200){
                toast.warn(response.error);
                console.log(response.message);
                return true;
            }
        });
        
        return false;
    };

    const handleIsMainImage = (index) => {
        setImages(images.map((img, i) => {
            index === i ? img.isMain = true : img.isMain = false;
            return img; 
       }))
    }

    const handleRemoveImage = (index) => {
        if (previews[0]?.default === true ) {
            return;    
        }

        const updatedPreviews = previews.filter((_, i) => i !== index);
        const newDefaultImage = [{ ...defaultImage }];

        setPreviews(updatedPreviews.length <= 0 ? newDefaultImage : updatedPreviews);
        setImages(updatedPreviews.length <= 0 ? newDefaultImage : updatedPreviews);
    }

    const comeBack = () => {
        navigation("/admin/product/management");
    }

    return (
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo.png" alt="logo-image" />
            </Link>
            <AuthBox myWidth={40} myHeight={95}>
                <h3> Cadastrando um novo produto </h3>
                <hr />
                <div className="form">
                    <div>
                        <Input
                            myGetter={name}
                            mySetter={setName}
                            myMargin={"1.5em 0em"}
                            myHeight={7}
                            myWidth={28}
                            myPlaceHolder="Camisa"
                        >
                            Nome
                        </Input>

                        <Input
                            myGetter={teamName}
                            mySetter={setTeamName}
                            myMargin={"1.5em 0em"}
                            myHeight={7}
                            myWidth={28}
                            myPlaceHolder="Real Madrid"
                        >
                            Nome do time
                        </Input>

                        <Input
                            myGetter={season}
                            mySetter={setSeason}
                            myMargin={"1.5em 0em"}
                            myHeight={7}
                            myWidth={28}
                            myPlaceHolder="2025"
                        >
                            Temporada
                        </Input>

                        <Input
                            myGetter={brand}
                            mySetter={setBrand}
                            myMargin={"1.5em 0em"}
                            myHeight={7}
                            myWidth={28}
                            myPlaceHolder="ADIDAS"
                        >
                            Marca
                        </Input>

                        <Input
                            myGetter={description}
                            mySetter={setDescription}
                            myMargin={"1.5em 0em"}
                            myHeight={7}
                            myWidth={28}
                            myPlaceHolder="Camisa Real Madrid 24/25, modelo AWAY"
                        >
                            Descrição
                        </Input>

                        <Input
                            myGetter={quantity}
                            mySetter={setQuantity}
                            myMargin={"1.5em 0em"}
                            myHeight={7}
                            myWidth={28}
                            myType="number"
                            myPlaceHolder="10"
                        >
                            Estoque
                        </Input>

                        <Input
                            myGetter={price}
                            mySetter={setPrice}
                            myMargin={"1.5em 0em"}
                            myHeight={7}
                            myWidth={28}
                            myType="number"
                            myPlaceHolder="299.99"
                        >
                            Preço
                        </Input>

                        <div className="group-select">
                            <label htmlFor="select">Avaliação:</label>
                            <select
                                id="select"
                                value={evaluation}
                                onChange={(e) => setEvaluation(e.target.value)}
                            >
                                <option key={1} value={""}>
                                    SELECIONE...
                                </option>
                                {evaluationOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="group-select">
                            <label htmlFor="select">Tipo da camisa:</label>
                            <select
                                id="select"
                                value={kitType}
                                onChange={(e) => setKitType(e.target.value)}
                            >
                                <option key={1} value={""}>
                                    SELECIONE...
                                </option>
                                {kitTypeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="button-group">
                            <Button
                                myMargin={"1.5em 1em 1.5em 0em"}
                                myHeight={5}
                                myWidth={14}
                                myBackgroundColor={"#007bff"}
                                myMethod={register}
                                myColor={"#ffff"}
                            >
                                Cadastrar
                            </Button>
                            <Button
                                myMargin={"1.5em 0em"}
                                myHeight={5}
                                myWidth={14}
                                myBackgroundColor={"#007bff"}
                                myMethod={comeBack}
                                myColor={"#ffff"}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
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
                                        <div className="group-radio-button">
                                            <div className="group-input-radio">
                                                <input disabled={img?.default} onChange={() => handleIsMainImage(index)} type="radio" id={index} name="is-main"/>
                                                <label htmlFor={index}> Imagem principal </label>
                                            </div>
                                            <Button
                                                myHeight={4}
                                                myWidth={8}
                                                myBackgroundColor={"#007bff"}
                                                myMethod={() => handleRemoveImage(index)}
                                                myColor={"#ffff"}
                                            > 
                                                Retirar 
                                            </Button>
                                        </div>
                                        <img
                                            src={img.previewUrl}
                                            alt={`Preview ${index}`}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                        <div className="group-input-file">
                            <label className="input-file" htmlFor="input-file">Adicionar imagem</label>
                            <input id="input-file" type="file" accept="image/jpeg" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
            </AuthBox>
        </Container>
    )
}