import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthBox from "../../../components/auth-box";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Cookies from 'js-cookie';

import { Container } from "./styled";

import userAdminApi from "../../../service/admin/userAdmin";
import ProductApi from "../../../service/product/product";

const apiUser = new userAdminApi();
const api = new ProductApi();

export default function ProductUpdate() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [season, setSeason] = useState("");
    const [kitType, setKitType] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");

    const [disableFields, setDisableFields] = useState(false);

    const location = useLocation();
    const navigation = useNavigate();

    const product = api.getProduct();
    const options = ["HOME", "AWAY", "THIRD", "GOALKEEPER", "SPECIAL"];

    const isFormCompleted = Object.values(
        [name, teamName, season, kitType, brand, description]
    ).every((value) => value.trim() !== "");

    const isPriceValid = price.toString().trim() !== "" && !isNaN(price) && Number(price) > 0;

    const update = async () => {
        if (!isFormCompleted && isPriceValid) {
            toast.warn("Preencha todos os campos !")
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
            status
        })

        if (response.status !== 204) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        if (product.id === response.data.id) {
            Cookies.set("selected-product", JSON.stringify(product), { expires: 1 });

        }

        toast.success("Produto alterado com sucesso!");
        navigation("/admin/product");
    }

    const handleUserInformation = () => {
        if (!location.state) {
            toast.warn("Selecione um produto antes de alterar!");
            navigation("/admin/management");
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
        setStatus(location.state[0].status);
    }

    const verifyGroup = () => {
        switch (apiUser.getUser().userGroup) {
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

    useEffect(() => {
        handleUserInformation();
        verifyGroup();
    }, [])

    return (
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo.png" alt="logo-image" />
            </Link>
            <AuthBox myWidth={40} myHeight={95}>
                <h3> Atualize o produto selecionado </h3>
                <hr />
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

                    <div>
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

                    <Button
                        myMargin={"1.5em 0em"}
                        myHeight={5}
                        myWidth={28.6}
                        myBackgroundColor={"#007bff"}
                        myMethod={update}
                        myColor={"#ffff"}
                    >
                        Entrar
                    </Button>
                </div>
            </AuthBox>
        </Container>
    )
}