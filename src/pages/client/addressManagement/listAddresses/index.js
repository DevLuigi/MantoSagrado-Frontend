import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthBox from "../../../../components/auth-box";
import AddressCard from "../../../../components/address-card";

import { Container, GroupButton } from "./styled";

import { MapPinPlusInside } from "lucide-react";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

import clientApi from "../../../../service/client/client";
import Button from "../../../../components/button";
const api = new clientApi();

export default function ListAddresses() {
    const [addresses, setAddresses] = useState([]);
    const [isRegistering, setIsRegistering] = useState(true);

    const userRegistration = Cookies.get("user-registration") ? JSON.parse(Cookies.get("user-registration")) : null;
    const userLogged = Cookies.get("user-logged-client") ? JSON.parse(Cookies.get("user-logged-client")) : null;

    const navigation = useNavigate();

    const userId = userRegistration?.id || userLogged?.id;

    const createAddress = () => {
        navigation("/address/create");
    }

    const listAllAddress = async () => {
        const response = await api.listAllAddresses(userId);
        if (response.status !== 200) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        setAddresses(response.data);
    }

    const updateDefaultAddress = async (addressId, type, defaultAddress) => {
        if (type !== "ENTREGA") {
            toast.warn("Apenas endereços de entrega podem ser marcados como padrão");
            return;
        }

        if (defaultAddress === "DEFAULT") {
            toast.warn("Esse já é o endereço padrão");
            return;
        }

        const confirmUpdate = window.confirm(`Tem certeza que deseja atualizar o endereço padrão?`);
        if (!confirmUpdate) {
            return;
        }

        const response = await api.updateDefaultAddress(userId, addressId);
        if (response.status !== 204) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        await listAllAddress();
        toast.success("Endereço padrão atualizado com sucesso!");
    }

    const finalizeRegistration = () => {
        const hasDefaultAddress = addresses.filter(address => address.defaultAddress === "DEFAULT" && address.type === "ENTREGA");
        if (hasDefaultAddress.length === 0) {
            toast.warn("Cadastre pelo menos um endereço de entrega e torne-o padrão");
            return;
        }

        const hasBillingAddress = addresses.filter(address => address.type === "FATURAMENTO");
        if (hasBillingAddress.length === 0) {
            toast.warn("Cadastre pelo menos um endereço de faturamento");
            return;
        }

        Cookies.remove("user-registration");
        navigation('/login');
    }

    const cancelRegistration = async () => {
        const confirmCancel = window.confirm(`Tem certeza que deseja cancelar? Tudo cadastrado até o momento será apagado`);
        if (!confirmCancel) {
            return;
        }

        const response = await api.deleteClient(userId);
        if (response.status !== 204) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        Cookies.remove("user-registration");
        navigation('/login');
    }

    useEffect(() => {
        listAllAddress();

        setIsRegistering(!userLogged);
    }, [])

    return (
        <Container>
            <img src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />
            <AuthBox
                myWidth={60}
                myHeight={60}
                myBackgroundColor={"#26232c"}
            >
                <h3> Lista de endereços </h3>
                <hr />
                <div className="address-box">
                    <div className="new-address" onClick={createAddress}>
                        <MapPinPlusInside />
                        <p> Adicionar um novo endereço </p>
                    </div>
                    <div className="address-list">
                        {
                            addresses.map((address) =>
                                <AddressCard
                                    key={address.id}
                                    address={address}
                                    myDefaultFunction={() => updateDefaultAddress(address.id, address.type, address.defaultAddress)}
                                />
                            )
                        }
                    </div>
                </div>
                <GroupButton>
                        {
                            isRegistering ? (
                            <>
                                <Button
                                    myHeight={6}
                                    myWidth={17.5}
                                    myBackgroundColor={"#F3C220"}
                                    myMargin={"0em 1em 1em 0em"}
                                    myMethod={finalizeRegistration}
                                    myColor={"#ffff"}
                                >
                                    Finalizar Cadastro
                                </Button>
                                <Button
                                    myHeight={6}
                                    myWidth={17.5}
                                    myBackgroundColor={"#F3C220"}
                                    myMargin={"0em 0em 1em 0em"}
                                    myMethod={cancelRegistration}
                                    myColor={"#ffff"}
                                >
                                    Cancelar
                                </Button>
                            </>
                             ) : (
                            <>
                                <Button
                                    myHeight={6}
                                    myWidth={17.5}
                                    myBackgroundColor={"#F3C220"}
                                    myMargin={"0em 1em 1em 0em"}
                                    myMethod={() => navigation("/profile")}
                                    myColor={"#ffff"}
                                >
                                    Voltar ao Perfil
                                </Button>
                            </>
                        )
                    }
                </GroupButton>
            </AuthBox>
        </Container>
    )
}