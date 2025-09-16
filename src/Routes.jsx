import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/login/login.jsx"));
const ListUser = lazy(() => import("./pages/listUser/listUser.jsx"));
const Choice = lazy(() => import("./pages/choice/choice.jsx"));
const UserRegister = lazy(() => import("./pages/userForm/create/UserFormPage.jsx"));
const UserFormEdit = lazy(() => import("./pages/userForm/edit/UserFormEdit.jsx"));

export default function RouteWeb() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/choice" element={<Choice />} />
            <Route path="/admin/users" element={<ListUser />} />
            <Route path="/admin/register" element={<UserRegister />} />
            <Route path="/admin/edit/:userid" element={<UserFormEdit />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
