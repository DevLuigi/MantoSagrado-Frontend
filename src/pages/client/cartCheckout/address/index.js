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

export default function ListAddressesCart() {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState([]);

    const userLogged = Cookies.get("user-logged-client") ? JSON.parse(Cookies.get("user-logged-client")) : null;
    const userId = userLogged?.id;

    const navigation = useNavigate();

    const createAddress = () => {
        navigation("/address/create");
    }

    const listAllAddress = async () => {
        const response = await api.listAllAddressesByDeliveryType(userId);
        if (response.status !== 200) {
            toast.error(response.error);
            console.log(response.message);
            return;
        }

        setSelectedAddress(...response.data.filter(address => address.defaultAddress === 'DEFAULT'));
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

    const nextStage = () => {
        if (Object.keys(selectedAddress).length <= 0) {
            toast.warn('Selecione um endereço de entrega antes de avançar');
            return;
        }

        Cookies.set("delivery-address", JSON.stringify(selectedAddress), { expires: 1 });
        navigation('/cart/checkout/payment');
    }

    const comeBack = async () => {
        const confirmCancel = window.confirm(`Tem certeza que deseja voltar?`);
        if (!confirmCancel) {
            return;
        }

        navigation(-1);
    }

    useEffect(() => {
        listAllAddress();
    }, [])

    return (
        <Container>
            <img src="/assets/images/icon_logo_sem_fundo.png" alt="logo-image" />
            <AuthBox
                myWidth={60}
                myHeight={60}
                myBackgroundColor={"#26232c"}
            >
                <h3> Selecione um endereço de entrega </h3>
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
                                    isSelected={selectedAddress.id === address.id}
                                    onSelect={() => setSelectedAddress(address)}
                                    myDefaultFunction={() => updateDefaultAddress(address.id, address.type, address.defaultAddress)}
                                />
                            )
                        }
                    </div>
                </div>
                <GroupButton> 
                    <>
                        <Button
                            myHeight={6}
                            myWidth={17.5}
                            myBackgroundColor={"#F3C220"}
                            myMargin={"0em 1em 1em 0em"}
                            myMethod={comeBack}
                            myColor={"#ffff"}
                        >
                            Voltar
                        </Button>
                        <Button
                            myHeight={6}
                            myWidth={17.5}
                            myBackgroundColor={"#F3C220"}
                            myMargin={"0em 0em 1em 0em"}
                            myMethod={nextStage}
                            myColor={"#ffff"}
                        >
                            Avançar
                        </Button>
                    </>
                </GroupButton>
            </AuthBox>
        </Container>
    )
}