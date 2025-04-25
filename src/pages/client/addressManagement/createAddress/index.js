import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Cookies from 'js-cookie';

import AuthBox from "../../../../components/auth-box";
import Input from "../../../../components/input";
import Button from "../../../../components/button";

import { Container, GroupButton } from "./styled";

import clientApi from "../../../../service/client/client";
const api = new clientApi();

export default function CreateAddress() {
    const [cep, setCep] = useState("");
    const [identification, setIdentification] = useState("");
    const [type, setType] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");


    const addressType = [
        "ENTREGA",
        "FATURAMENTO"
    ];

    const userRegistration = Cookies.get("user-registration") ? JSON.parse(Cookies.get("user-registration")) : null;
    const userLogged = Cookies.get("user-logged-client") ? JSON.parse(Cookies.get("user-logged-client")) : null;
    const navigation = useNavigate();

    const clientData = userRegistration || userLogged;

    const isFormCompleted = Object.values(
        [cep, identification, type, streetAddress, number, neighborhood, city, uf]
    ).every((value) => value.trim() !== "");

    const createAddress = async () => {
        if (!isFormCompleted) {
            toast.warn("Preencha todos os campos")
            return;
        }

        let response = await api.createAddress(clientData.id, {
            identification,
            type,
            streetAddress,
            "number": Number(number),
            complement,
            cep,
            neighborhood,
            city,
            uf,
            "client": clientData,
            "defaultAddress": "NOT_DEFAULT"
        })

        if (response.status !== 204) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        toast.success("Endereço inserido com sucesso!");
        navigation("/address/list");
    }

    const seachCep = async (cep) => {
        if (cep.trim() === "") {
            return;
        }

        const regex = /^\d{8}$/;
        if (!regex.test(cep)) {
            toast.error("Informe um CEP válido");
            return;
        }

        const response = await api.searchCep(cep);
        if (response.status !== 200) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        if (response.data?.erro) {
            toast.error("Informe um CEP válido");
            return;
        }

        setStreetAddress(response.data.logradouro);
        setNeighborhood(response.data.bairro);
        setCity(response.data.localidade);
        setUf(response.data.uf);
    }

    const comeBack = () => {
        navigation("/address/list");
    }

    return (
        <Container>
            <img src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />
            <AuthBox
                myWidth={45}
                myHeight={60}
                myBackgroundColor={"#26232c"}
            >
                <h3> Novo endereço </h3>
                <hr />
                <div>
                    <Input
                        myGetter={cep}
                        mySetter={setCep}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={35}
                        myOnBlur={seachCep}
                    >
                        Seu CEP
                    </Input>
                    <Input
                        myGetter={identification}
                        mySetter={setIdentification}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={35}
                    >
                        Identificação
                    </Input>
                    <Input
                        myGetter={streetAddress}
                        mySetter={setStreetAddress}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={35}
                        myDisabled={true}
                    >
                        Logradouro
                    </Input>
                    <Input
                        myGetter={number}
                        mySetter={setNumber}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={35}
                    >
                        Número
                    </Input>
                    <Input
                        myGetter={complement}
                        mySetter={setComplement}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={35}
                    >
                        Complemento
                    </Input>
                    <Input
                        myGetter={neighborhood}
                        mySetter={setNeighborhood}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={35}
                        myDisabled={true}
                    >
                        Bairro
                    </Input>
                    <Input
                        myGetter={city}
                        mySetter={setCity}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={35}
                        myDisabled={true}
                    >
                        Cidade
                    </Input>
                    <Input
                        myGetter={uf}
                        mySetter={setUf}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={35}
                        myDisabled={true}
                    >
                        UF
                    </Input>
                    <div>
                        <label htmlFor="select">Tipo de endereço:</label>
                        <select
                            id="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option key={1} value={""}>
                                SELECIONE...
                            </option>
                            {addressType.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <GroupButton>
                        <Button
                            myHeight={6}
                            myWidth={17.5}
                            myBackgroundColor={"#F3C220"}
                            myMargin={"0em 1em 1em 0em"}
                            myMethod={createAddress}
                            myColor={"#ffff"}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            myHeight={6}
                            myWidth={17.5}
                            myBackgroundColor={"#F3C220"}
                            myMargin={"0em 0em 1em 0em"}
                            myMethod={comeBack}
                            myColor={"#ffff"}
                        >
                            Cancelar
                        </Button>
                    </GroupButton>
                </div>
            </AuthBox>
        </Container>
    )
}