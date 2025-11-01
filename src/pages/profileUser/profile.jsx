import "./profile.scss";
import { useState } from "react";
import { HeaderProfile } from "../../components/layout/HeaderProfile";
import { ContainerProfile } from "../../components/profile/containerProfile";
import { InfoProfile } from "../../components/profile/infoProfile";
import { FormProfile } from "../../components/profile/formProfile";
import { Address } from "../../components/profile/address";
import { AddAddress } from "../../components/profile/addAddress";

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState("cadastro");
    const [showAddAddress, setShowAddAddress] = useState(false); 


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
                        <span>Olá, Alisson</span>
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
                            !showAddAddress ? (
                                <Address onAddAddress={() => setShowAddAddress(true)} ParentElement={"Profile"}/>
                            ) : (
                                <AddAddress onBack={() => setShowAddAddress(false)} ParentElement={"Profile"} />
                            )
                        )}
                    </div>

                    {/* <Address /> */}

                    {/* <AddAddress /> */}
                </div>


            </main>
        </>
    );
}

export default Profile;