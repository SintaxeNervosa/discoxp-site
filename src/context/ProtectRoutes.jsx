import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectRoutes = ({ Children, requireDtype }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const dataUser = sessionStorage.getItem("user-data");

        if (dataUser == null) {
            navigate("/login");
            return;
        };

        const dataUserToJson = JSON.parse(dataUser);
        const group = dataUserToJson.group;

        if (!group) {
            navigate("/login");
            return;
        };
        return Children
    });
};