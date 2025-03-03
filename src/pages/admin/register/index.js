import { use, useState } from "react";

import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import AuthBox from "../../../components/auth-box";
import Button from "../../../components/button";
import Input from "../../../components/input";

import { Container } from "./styled";

import userAdminApi from "../../../service/admin/userAdmin.js";
const api = new userAdminApi();

export default function Register() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [group, setGroup] = useState("");

    const options = ["ADMIN", "ESTOQUISTA"];

    const navigation = useNavigate();

    const isFormCompleted = Object.values(
        [email, password, confirmPassword, name, cpf, group]
    ).every((value) => value.trim() !== "");

    const isInvalidEmail = () => {
        const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        return !emailRegex.test(email);
    }

    const register = async () => {
        if (!isFormCompleted) {
            toast.warn("Preencha todos os campos !")
            return;
        }

        if (password != confirmPassword) {
            toast.warn("As senhas não são iguais !")
            return;
        }

        if (isInvalidEmail()) {
            toast.warn("O email deve ser bem formatado");
            return;
        }

        let response = await api.register({ name, cpf, email, password, "userGroup": group, "status": "ATIVADO" });
        
        if(response.status !== 200){
            toast.warn(response.error);
            console.log(response.message);
            return;
        }

        toast.success("Registro inserido com sucesso!");
        navigation("/admin/management");

    }

    return (
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo.png" alt="logo-image" />
            </Link>
            <AuthBox myWidth={40} myHeight={70}>
                <h3> Acesse sua conta </h3>
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
                        myGetter={email}
                        mySetter={setEmail}
                        myMargin={"1.5em 0em"}
                        myHeight={7}
                        myWidth={28}
                        myPlaceHolder="email@email.com"
                    >
                        Sua Email
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
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
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