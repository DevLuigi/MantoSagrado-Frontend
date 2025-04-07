import { useState } from "react";

import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import AuthBox from "../../../../components/auth-box";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

import { Container } from "./styled";

import clientApi from "../../../../service/client/client";
const api = new clientApi();

export default function ClientLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigate();

    const login = async () => {
        if (!email || !password) {
            toast.warn("Preencha o e-mail e senha antes de entrar");
            return;
        }

        const response = await api.login({ email, password });

        if (response.status === 404) {
            toast.error("Crendenciais inválidas");
            return;
        };

        if (response.status !== 200) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        Cookies.set("user-logged", JSON.stringify(response.data), { expires: 7 });
        toast.success("Login efetuado com sucesso");
        navigation("/");
    }

    const comeBack = () => {
        navigation("/");
    }

    return (
        <Container>
            <div className="comeback">
                <Button
                    myHeight={6}
                    myWidth={8}
                    myBackgroundColor={"#F3C220"}
                    myColor={"#fffdf9"}
                    myMethod={comeBack}
                >
                    Voltar
                </Button>
            </div>

            <Link to={"/"}>
                <img src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />
            </Link>
            <AuthBox myWidth={40} myHeight={60} myBackgroundColor={"#4A4A4A"}>
                <h3> Acesse sua conta </h3>
                <hr />
                <div>
                    <Input
                        myGetter={email}
                        mySetter={setEmail}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={28}
                    >
                        Seu e-mail
                    </Input>
                    <Input
                        myGetter={password}
                        mySetter={setPassword}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={28}
                        myType={"password"}
                    >
                        Sua senha
                    </Input>
                    <Button
                        myHeight={6}
                        myWidth={29}
                        myBackgroundColor={"#F3C220"}
                        myMethod={login}
                        myColor={"#ffff"}
                    >
                        Entrar
                    </Button>
                </div>
            </AuthBox>
        </Container>
    )
}