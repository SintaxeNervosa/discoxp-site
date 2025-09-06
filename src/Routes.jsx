import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/login/login';
import ListUser from "./pages/listUser/listUser";
import Choice from "./pages/choice/choice";
import UserRegister from "./pages/userForm/UserFormPage";
import UserFormEdit from "./pages/userForm/edit/UserFormEdit";

export default function RouteWeb() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/users" element={<ListUser />} />
                    <Route path="/choice" element={<Choice />} />
                    <Route path="admin/register" element={<UserRegister />} />
                    <Route path="admin/edit/:userid" element={<UserFormEdit />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}