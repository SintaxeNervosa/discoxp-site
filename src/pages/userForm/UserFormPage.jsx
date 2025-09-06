import './StyleUserFormPage.css';

import UserForm from "../../components/form/UserForm";


export default function UserRegister() {
    return (
        <div className="user-form-page-container">
            <UserForm typeForm={"register"}/>
        </div>
    );
}