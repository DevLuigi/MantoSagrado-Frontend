import { useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

import AuthBox from "../../../../components/auth-box/index.js";
import Button from "../../../../components/button/index.js";
import Input from "../../../../components/input/index.js";

import { Container } from "./styled.js";

import clientApi from "../../../../service/client/client.js";
const api = new clientApi();

export default function ClientRegister() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");

    const options = ["MASCULINO", "FEMININO", "OUTRO", "NAO_INFORMADO"];

    const navigation = useNavigate();

    const isFormCompleted = Object.values(
        [email, password, confirmPassword, name, cpf, birthDate, gender]
    ).every((value) => value.trim() !== "");

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

    const register = async () => {
        if (!isFormCompleted) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        if (password !== confirmPassword) {
            toast.warn("As senhas não são iguais!");
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

        let response = await api.register({ email, password, confirmPassword, name, cpf, birthDate, gender });
        
        if(response.status !== 200){
            toast.warn(response.error);
            console.log(response.message);
            return;
        }

        toast.success("Registro inserido com sucesso!");
        Cookies.set("user-registration", JSON.stringify(response.data), { expires: 1 });
        navigation("/address/list");
    }

    const comeBack = () => {
        navigation("/");
    }

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
                        myId={"name"}
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
                        myId={"cpf"}
                        myGetter={cpf}
                        mySetter={setCpf}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myPlaceHolder="999.999.99-99"
                    >
                        Seu CPF
                    </Input>

                    <Input
                        myId={"email"}
                        myGetter={email}
                        mySetter={setEmail}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myPlaceHolder="email@email.com"
                    >
                        Seu Email
                    </Input>

                    <Input
                        myId={"birthDate"}
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
                        myId={"password"}
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
                        myId={"confirmPassword"}
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
                            myId={"submit"}
                            myMargin={"1.5em 1em 1.5em 0em"}
                            myHeight={5}
                            myWidth={14}
                            myBackgroundColor={"#F3C220"}
                            myMethod={register}
                            myColor={"#ffff"}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            myId={"cancel"}
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