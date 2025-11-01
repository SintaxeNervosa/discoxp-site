import { useEffect, useState } from "react";
import "./address.scss"
import { changeFavoriteAddres, getAllAddressByUserId } from "../../connection/AddressPath";
import heartFavoriteAddress from '../../assets/images/user/profile/address/heart-favorite.svg';
import notHeartFavoriteAddress from '../../assets/images/user/profile/address/heart-not-favorite.svg';
import OrderForm from "../../pages/orderForm/orderForm";

export function Address({ onAddAddress, changeVisibityForm, ParentElement }){
    const [addressList, setAddressList] = useState([]);
    const userFromSession = sessionStorage.getItem("user-data");

    const loadAddress = async () => {
        const userParseJson = JSON.parse(userFromSession);
        const addressList = await getAllAddressByUserId(userParseJson.id);

        setAddressList(addressList.data || []);
    }

    const changeFavoriteAddress = async (addressId) => {

        const userParseJson = JSON.parse(userFromSession);

        const obj = {
            clientId: userParseJson.id,
            addressId: addressId
        };

        const response = await changeFavoriteAddres(obj);

        if (response.status == 200) { loadAddress(); }
    }

    const onAddAddressOrChangeVisibityForm = () =>{
        console.log (ParentElement);
        if(ParentElement == "OrderForm"){
            changeVisibityForm()
            return;
        }onAddAddress();
    }

    useEffect(() => {
        loadAddress();
    }, []);

    useEffect(() => {
        console.log(addressList);
    }, [addressList]);

    return (
        <>
            <div className="enderecos">
                <div className="enderecos__header">
                    <h2>Endereços</h2>
                    <button className="add-endereco"
                        onClick={onAddAddressOrChangeVisibityForm} >
                        + Adicionar endereço
                    </button>
                </div>

                <div className="enderecos__lista">
                    {addressList.map((address) => (
                        <div key={address.id} className="endereco-card">
                            <img
                                src={address.isFavorite ? heartFavoriteAddress : notHeartFavoriteAddress}
                                onClick={() => changeFavoriteAddress(address.id)}
                            />
                            <p>{address.street}</p>
                            <p>{address.neighborhood}</p>
                            <p>{address.cep}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}