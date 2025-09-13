import './StyleFormEdit.scss';

import { useParams } from "react-router-dom";
import UserForm from "../../../components/form/UserForm";

export default function UserFormEdit() {

    const { userid } = useParams();

    return (
        <div className="container-userform-edit">
            <UserForm userId={userid} />
        </div>
    );
}