import "./Profile.scss";
import { useEffect, useState } from "react";
import { HeaderProfile } from "../../../components/layout/HeaderProfile";
import { ContainerProfile } from "../../../components/client/profile/container/ProfileContainer";
import { InfoProfile } from "../../../components/client/profile/info/InfoProfile";
import { FormProfile } from "../../../components/client/profile/form/FormProfile";
import { Address } from "../../../components/client/profile/addressList/AddressList";
import { FormAddress } from "../../../components/client/profile/formAddress/FormAddress";
import { Orders } from "../../../components/client/profile/ordersList/Orders";

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState("cadastro");
    const [showFormAddress, setShowFormAddress] = useState(false); 
    const [username, setUsername] = useState("");

     useEffect(() => {
        const hasReloaded = sessionStorage.getItem('profileReloaded');
        
        if (!hasReloaded) {
            sessionStorage.setItem('profileReloaded', 'true');
            setTimeout(() => window.location.reload(), 50);
        }
        
        // Limpando ao sair d page
        return () => {
            sessionStorage.removeItem('profileReloaded');
        };
    }, []);


    useEffect(() => {
        let userData = JSON.parse(sessionStorage.getItem("user-data"));
        let firstName = userData.username?.split(" ")[0];
        
        setUsername(firstName);
    })

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleSave() {
        setIsEditing(false);
    }

    return (
        <>
            <HeaderProfile />
            <main className="profile">
                <div className="user">
                    <div className="icon-wrapper">
                        <a href="/home">
                            <img src="/img/home.png" alt="back" className="back-icon" />
                        </a>
                    </div>
                    <div className="nameUser">
                        <img src="/img/user.png" alt="user" className="user-icon" />
                        <span>Olá, {username}</span>
                    </div>
                </div>

                <div className="content-wrapper">
                    <ContainerProfile onSelect={setActiveSection} />

                    <div className="card">
                        {activeSection === "cadastro" && (
                            <>
                                {isEditing ? (
                                    <FormProfile onSave={handleSave} />
                                ) : (
                                    <InfoProfile />
                                )}
                                {!isEditing && (
                                    <button className="botao" onClick={handleEditClick}>
                                        Editar
                                    </button>
                                )}
                            </>
                        )}

                        {activeSection === "enderecos" && (
                            !showFormAddress ? (
                                <Address onFormAddress={() => setShowFormAddress(true)} ParentElement={"Profile"}/>
                            ) : (
                                <FormAddress onBack={() => setShowFormAddress(false)} ParentElement={"Profile"} />
                            )
                        )}
                    </div>
                         {activeSection === "pedidos" && (
                            <Orders />
                        )}
                    {/* <Address /> */}

                    {/* <FormAddress /> */}
                </div>


            </main>
        </>
    );
}

export default Profile;