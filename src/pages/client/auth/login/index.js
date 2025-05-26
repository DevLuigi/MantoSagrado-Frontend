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
            toast.error("Credenciais inválidas");
            return;
        };

        if (response.status !== 200) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        
        Cookies.set("user-logged-client", JSON.stringify(response.data), { expires: 7 });
        toast.success("Login efetuado com sucesso");

        const isCartDone = Cookies.get("cartDone") ? JSON.parse(Cookies.get("cartDone"))?.isDone : false;
        if(isCartDone){
            Cookies.remove("cartDone");
            navigation("/cart");
            return;
        }

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
            <AuthBox 
                myWidth={40} 
                myHeight={60} 
                myBackgroundColor={"#26232c"}
            >
                <h3> Acesse sua conta </h3>
                <hr />
                <div>
                    <Input
                        myId={"email"}
                        myGetter={email}
                        mySetter={setEmail}
                        myMargin={"1.5em 0em"}
                        myHeight={9}
                        myWidth={28}
                    >
                        Seu e-mail
                    </Input>
                    <Input
                        myId={"password"}
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
                        myId={"submit"}
                        myHeight={6}
                        myWidth={29}
                        myBackgroundColor={"#F3C220"}
                        myMargin={"0em 0em 1em 0em"}
                        myMethod={login}
                        myColor={"#ffff"}
                    >
                        Entrar
                    </Button>
                    <div className="register-link">
                        <p> Ainda não tem uma conta? </p>
                        <a className="register" href="/register"> Cadastre-se </a>
                    </div>
                </div>
            </AuthBox>
        </Container>
    )
}