import { useState } from "react";

import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import AuthBox from "../../../components/auth-box";
import Button  from "../../../components/button";
import Input   from "../../../components/input";

import {Container}  from "./styled";

import userAdminApi from "../../../service/admin/userAdmin";
const api = new userAdminApi();

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigate();

    const login = async () => {
        if (!email || !password) { 
            toast.warn("Preencha o e-mail e senha antes de entrar");
            return;
        }
        
        const response = await api.login({email, password});
        
        if(response.status === 404) {
            toast.error("Credenciais inválidas");
            return;
        };

        if(response.status !== 200) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        Cookies.set("user-logged-admin", JSON.stringify(response.data), { expires: 7 });  
        toast.success("Login efetuado com sucesso");    
        navigation("/admin/menu");
    }

    return(
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo_sem_fundo.png" alt="logo da empresa"/>
            </Link>
            <AuthBox myWidth={40} myHeight={60}>
                <h3> Login de administrador </h3>
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
                        myBackgroundColor={"#007bff"}
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