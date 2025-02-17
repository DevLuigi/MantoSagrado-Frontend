import { useState } from "react";

import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import AuthBox from "../../../components/auth-box";
import Button  from "../../../components/button";
import Input   from "../../../components/input";

import {Container}  from "./styled";

// import AuthApi from "../../../service/authApi";
// const api = new AuthApi();

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigate();

    const login = async () => {
        if (!email || !password) { 
            toast.warn("Preencha o e-mail e senha antes de entrar");
            return;
        }

        // Fazer conexão com API
        // const response = await api.login({email, password});
        
        const response = {
            status: 200,
            data: 'cookie'
        }
        
        if(response.status === 404) {
            toast.warn("Crendenciais inválidas");
            return;
        };

        Cookies.set("user-logged", JSON.stringify(response.data), { expires: 7 });  
        toast.success("Login efetuado com sucesso");    
        
        // Colocar rota correta posteriormente
        // navigation("/");
    }

    return(
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo.png" alt="logo-image"/>
            </Link>
            <AuthBox myWidth={40} myHeight={60}>
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
                    > 
                        Sua senha 
                    </Input>
                    <Button
                        myHeight={6}
                        myWidth={29}
                        myBackgroundColor={"yellow"}
                        myMethod={login}
                    >
                        Entrar
                    </Button>
                </div>
            </AuthBox>
        </Container>
    )
}