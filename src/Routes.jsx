import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/login/login';
import ListUser from "./pages/listUser/listUser";
import Choice from "./pages/choice/choice";
import UserFormPage from "./pages/userForm/UserFormPage";

export default function RouteWeb() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/list-user" element={<ListUser />} />
                    <Route path="/choice" element={<Choice />} />
                    <Route path="admin/register" element={<UserFormPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}