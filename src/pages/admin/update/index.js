import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthBox from "../../../components/auth-box";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Cookies from 'js-cookie';

import { Container } from "./styled";

import userAdminApi from "../../../service/admin/userAdmin";
const api = new userAdminApi();

export default function Update() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userGroup, setUserGroup] = useState("");
    const [status, setStatus] = useState("");

    const location = useLocation();
    const navigation = useNavigate();

    const user = api.getUser();
    const options = ["ADMIN", "ESTOQUISTA"];

    const isFormCompleted = Object.values(
        [email, password, confirmPassword, name, cpf, userGroup]
    ).every((value) => value?.trim() !== "");

    const isInvalidEmail = () => {
        const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        return !emailRegex.test(email);
    }

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
        
        let response = await api.update(user.id, {
            id,
            name,
            cpf,
            email,
            password,
            userGroup,
            status
        })

        if (response.status !== 204) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        if (user.id === response.data.id) {
            Cookies.set("user-logged", JSON.stringify(response.data), { expires: 7 });   
        }

        toast.success("Usuário alterado com sucesso!");
        navigation("/admin/management");
    }

    const handleUserInformation = () => {
        if (!location.state) {
            toast.warn("Selecione um usuário antes de alterar!");
            navigation("/admin/management");
            return;
        }

        setId(location.state[0].id);
        setName(location.state[0].name);
        setEmail(location.state[0].email);
        setCpf(location.state[0].cpf);
        setUserGroup(location.state[0].userGroup);
        setStatus(location.state[0].status);
    }

    useEffect(() => {
        handleUserInformation();
    }, [])

    return (
        <Container>
            <Link to={"/"}>
                <img src="/assets/images/icon_logo.png" alt="logo-image" />
            </Link>
            <AuthBox myWidth={40} myHeight={70}>
                <h3> Alterando usuário </h3>
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
                        myPlaceHolder="999.999.999-99"
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
                            value={userGroup}
                            onChange={(e) => setUserGroup(e.target.value)}
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
                        Alterar
                    </Button>
                </div>
            </AuthBox>
        </Container>
    )
}