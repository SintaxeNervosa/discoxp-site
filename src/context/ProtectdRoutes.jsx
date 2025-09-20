import { Navigate, useNavigate } from "react-router-dom";

export const protectdRoutes = ({Children, requireDtype}) => {
    const tipoUser = sessionStorage.getItem("user-data");
    const dataUserToJson = JSON.parse(dataUser);
    const group = dataUserToJson.group;

    const navigate = useNavigate()

    if(!group){
        return navigate("/login")
    } 
    return Children
}