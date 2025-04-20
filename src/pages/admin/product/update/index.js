import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import AuthBox from "../../../../components/auth-box";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

import { Container } from "./styled";

import userAdminApi from "../../../../service/admin/userAdmin.js";
import ProductApi from "../../../../service/admin/productAdmin.js";
import { newFile } from "../../../../service/utils/fileUtils.js";

const apiUser = new userAdminApi();
const api = new ProductApi();

export default function ProductUpdate() {
    const defaultImage = {
        default: true,
        previewUrl: '/assets/images/icon_logo.jpg'
    }

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
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    const [disableFields, setDisableFields] = useState(false);

    const location = useLocation();
    const navigation = useNavigate();

    const options = ["HOME", "AWAY", "THIRD", "GOALKEEPER", "SPECIAL"];
    const evaluationOptions = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

    const isFormCompleted = 
        Object.values(
            [name, teamName, season, kitType, brand, description]
        ).every((value) => value.trim() !== "");
    
    const isPriceValid = price.toString().trim() !== "" && !isNaN(price) && Number(price) > 0
    const isEvaluationValid = evaluation.toString().trim() !== "" && !isNaN(evaluation) && Number(evaluation) > 0 && Number(evaluation) < 6;
    const isMainNotSelected = images.every(img => img.isMain === false);

    const update = async () => {
        if (!isFormCompleted || !isPriceValid || !isEvaluationValid || isMainNotSelected) {
            toast.warn("Preencha todos os campos !");
            return;
        }

        let response = await api.update(id, {
            id,
            name,
            teamName,
            season,
            kitType,
            brand,
            description,
            quantity,
            price,
            status,
            evaluation
        });

        if (response.status !== 200) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        if(await handleImageUpload(response.data.id)) return;

        toast.success("Produto alterado com sucesso!");
        navigation("/admin/product/management");
    }

    const handleImageUpload = async (productId) => {
        if (!productId) {
            toast.warn("Id de produto não encontrado!");
            return;
        }
        
        let response;
        response = await api.deleteAllImagesByProduct(productId);
        if(response.status !== 204){
            toast.warn(response.error);
            console.log(response.message);
            return true;
        }

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

        const files = Array.from(event.target.files); // Converter FileList em array
        const newPreviews = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
            isMain: false
        }));

        setImages((prevImages) => [...prevImages, ...newPreviews]);
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const handleUserInformation = async () => {
        if (!location.state) {
            toast.warn("Selecione um produto antes de alterar!");
            navigation("/admin/product/management");
            return;
        }

        setId(location.state[0].id);
        setName(location.state[0].name);
        setTeamName(location.state[0].teamName);
        setSeason(location.state[0].season);
        setKitType(location.state[0].kitType);
        setBrand(location.state[0].brand);
        setDescription(location.state[0].description);
        setQuantity(location.state[0].quantity);
        setPrice(location.state[0].price);
        setEvaluation(location.state[0].evaluation);
        setStatus(location.state[0].status);

        let response = await api.listAllImagesByProduct(location.state[0].id);
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

        setImages(response?.data.map((img, index) => {
            const file = newFile(img, index);
             
            return { 
                "file": file,
                "previewUrl": img.imagePath,
                "isMain": img.isMain
            }
        }));
    }

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

    const verifyGroup = () => {
        switch (apiUser.getUserAdmin().userGroup) {
            case "ADMIN":
                setDisableFields(false);
                break;
            
            case "ESTOQUISTA":
                setDisableFields(true);
                break;
    
            default:
                break;
        }
    };

    const verifyIsMainImage = () => {
        if (!previews) {
            return;
        }
        
        let index = previews.findIndex(img => img.isMain);
        if (index === -1) {
            return;
        }

        const input = document.getElementById(index);
        input.click();
    }

    const comeBack = () => {
        navigation("/admin/product/management");
    }

    useEffect(() => {
        handleUserInformation();
        verifyGroup();
    }, [])

    useEffect(() => {
        verifyIsMainImage();
    }, [previews]);

    return (
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />
            </Link>
            <AuthBox myWidth={40} myHeight={105}>
                <h3> Alterando produto </h3>
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
                            myDisabled={disableFields}
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
                            myDisabled={disableFields}
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
                            myDisabled={disableFields}
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
                            myDisabled={disableFields}
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
                            myDisabled={disableFields}
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
                            myPlaceHolder="100"
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
                            myDisabled={disableFields}
                        >
                            Preço
                        </Input>

                        <div className="group-select">
                            <label htmlFor="select">Avaliação:</label>
                            <select
                                id="select"
                                value={evaluation}
                                onChange={(e) => setEvaluation(e.target.value)}
                                disabled={disableFields}
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
                            <label htmlFor="select">Escolha uma opção:</label>
                            <select
                                id="select"
                                value={kitType}
                                onChange={(e) => setKitType(e.target.value)}
                                disabled={disableFields}
                            >
                                <option key={1} value={""}>
                                    SELECIONE...
                                </option>
                                {options.map((option, index) => (
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
                                myMethod={update}
                                myColor={"#ffff"}
                            >
                                alterar
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
                            <label disabled={disableFields} className="input-file" htmlFor="input-file">Adicionar imagem</label>
                            <input disabled={disableFields} id="input-file" type="file" accept="image/jpeg" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
            </AuthBox>
        </Container>
    )
}