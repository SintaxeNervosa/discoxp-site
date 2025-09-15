import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/login/login"));
const ListUser = lazy(() => import("./pages/listUser/listUser"));
const Choice = lazy(() => import("./pages/choice/choice"));
const UserRegister = lazy(() => import("./pages/userForm/UserFormPage"));
const UserFormEdit = lazy(() => import("./pages/userForm/edit/UserFormEdit"));

export default function RouteWeb() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<ListUser />} />
            <Route path="/choice" element={<Choice />} />
            <Route path="admin/register" element={<UserRegister />} />
            <Route path="admin/edit/:userid" element={<UserFormEdit />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
