import { use, useState } from "react";

import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import AuthBox from "../../../components/auth-box";
import Button from "../../../components/button";
import Input from "../../../components/input";

import { Container } from "./styled";

import ProductApi from "../../../service/product/product.js";
const api = new ProductApi();

export default function ProductRegister() {
    const [name, setName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [season, setSeason] = useState("");
    const [kitType, setKitType] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const options = ["HOME", "AWAY", "THIRD", "GOALKEEPER", "SPECIAL"];

    const navigation = useNavigate();

    const isFormCompleted = Object.values(
        [name, teamName, season, kitType, brand, description]
    ).every((value) => value.trim() !== "");

    const isPriceValid = price.toString().trim() !== "" && !isNaN(price) && Number(price) > 0;

    const register = async () => {
        if (!isFormCompleted && isPriceValid) {
            toast.warn("Preencha todos os campos !")
            return;
        }

        let response = await api.register({ name, teamName, season, kitType, brand, description, quantity: 0, price, "status": "DESATIVADO" });
        
        if(response.status !== 200){
            toast.warn(response.error);
            console.log(response.message);
            return;
        }

        toast.success("Registro inserido com sucesso!");
        navigation("/admin/product");

    }

    return (
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo.png" alt="logo-image" />
            </Link>
            <AuthBox myWidth={40} myHeight={70}>
                <h3> Registre um novo produto </h3>
                <hr />
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

                    <div>
                        <label htmlFor="select">Escolha uma opção:</label>
                        <select
                            id="select"
                            value={kitType}
                            onChange={(e) => setKitType(e.target.value)}
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
                        myMethod={register}
                        myColor={"#ffff"}
                    >
                        Entrar
                    </Button>
                </div>
            </AuthBox>
        </Container>
    )
}