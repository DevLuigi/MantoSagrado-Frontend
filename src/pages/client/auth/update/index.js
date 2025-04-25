import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

import AuthBox from "../../../../components/auth-box/index.js";
import Button from "../../../../components/button/index.js";
import Input from "../../../../components/input/index.js";

import { Container } from "./styled.js";

import clientApi from "../../../../service/client/client.js";
const api = new clientApi();

export default function ClientUpdate() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");

    const userData = JSON.parse(Cookies.get("user-logged-client"));

    const options = ["MASCULINO", "FEMININO", "OUTRO", "NAO_INFORMADO"];

    const navigation = useNavigate();

    const isFormCompleted = Object.values(
        [email, password, confirmPassword, name, lastName, cpf, birthDate, gender]);

    const isInvalidEmail = () => {
        const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        return !emailRegex.test(email);
    }

    const isValidBirthDate = (dateString) => {
        const birthDate = new Date(dateString);
        const today = new Date();
        
        birthDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    
        return birthDate < today;
    };     

    const update = async () => {
        if (!isFormCompleted) {
            toast.warn("Preencha todos os campos !")
            return;
        }

        if (password !== confirmPassword) {
            toast.warn("As senhas não são iguais !")
            return;
        }

        if (isInvalidEmail()) {
            toast.warn("O email deve ser bem formatado");
            return;
        }

        if (!isValidBirthDate(birthDate)) {
            toast.warn("A data de nascimento deve ser anterior à data atual.");
            return;
        }

        let response = await api.update(userData.id, {
            id,
            email,
            password,
            name,
            lastName,
            cpf,
            birthDate,
            gender            
        })

        if(response.status !== 204){
            toast.warn(response.error);
            console.log(response.message);
            return;
        }

        toast.success("Dados atualizados com sucesso!");
        comeBack();
    }

    const handleUserInformation = async () => {
        if (!userData) {
            toast.warn("Faça login antes de usar o sistema!");
            navigation("/login");
            return;
        }

        try {
            const user = await api.listById(userData.id);
            console.log(user);
    
            setId(user.data.id);
            setName(user.data.name);
            setLastName(user.data.lastName);
            setEmail(user.data.email);
            setCpf(user.data.cpf);
            setBirthDate(user.data.birthDate);
            setGender(user.data.gender);

        } catch (error) {
            toast.warn("Erro ao carregar dados do cliente.");
            console.error(error);
        }
    }

    const comeBack = () => {
        navigation("/profile");
    }

    useEffect(() => {
        handleUserInformation();
    }, []);

    return (
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />
            </Link>
            <AuthBox 
                myWidth={40} 
                myHeight={90} 
                myBackgroundColor={"#26232c"}
            >
                <h3> Cadastre-se </h3>
                <hr />
                <div>
                    <Input
                        myGetter={name}
                        mySetter={setName}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myPlaceHolder="João Silva"
                    >
                        Seu Nome
                    </Input>

                    <Input
                        myGetter={lastName}
                        mySetter={setLastName}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myPlaceHolder="João Silva"
                    >
                        Seu Sobrenome
                    </Input>

                    <Input
                        myGetter={cpf}
                        mySetter={setCpf}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myPlaceHolder="999.999.99-99"
                        myDisabled={true}
                    >
                        Seu CPF
                    </Input>

                    <Input
                        myGetter={email}
                        mySetter={setEmail}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myPlaceHolder="email@email.com"
                        myDisabled={true}
                    >
                        Seu Email
                    </Input>

                    <Input
                        myGetter={birthDate}
                        mySetter={setBirthDate}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myType="date"
                    >
                        Sua data de nascimento
                    </Input>

                    <Input
                        myGetter={password}
                        mySetter={setPassword}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myType="password"
                        myPlaceHolder="*****"
                    >
                        Sua senha
                    </Input>

                    <Input
                        myGetter={confirmPassword}
                        mySetter={setConfirmPassword}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myType="password"
                        myPlaceHolder="*****"
                    >
                        Confirme sua Senha
                    </Input>

                    <div>
                        <label htmlFor="select">Escolha uma opção:</label>
                        <select
                            id="select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
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
                            myBackgroundColor={"#F3C220"}
                            myMethod={update}
                            myColor={"#ffff"}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            myMargin={"1.5em 0em"}
                            myHeight={5}
                            myWidth={14}
                            myBackgroundColor={"#F3C220"}
                            myMethod={comeBack}
                            myColor={"#ffff"}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </AuthBox>
        </Container>
    )
}