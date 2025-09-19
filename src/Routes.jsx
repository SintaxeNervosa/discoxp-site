import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/login/login.jsx"));
const ListUser = lazy(() => import("./pages/listUser/listUser.jsx"));
const Choice = lazy(() => import("./pages/choice/choice.jsx"));
const UserRegister = lazy(() => import("./pages/userForm/create/UserFormPage.jsx"));
const UserFormEdit = lazy(() => import("./pages/userForm/edit/UserFormEdit.jsx"));
const ProductFormCreate = lazy(() => import("./pages/form/product/create/ProductFormCreate.jsx"));
const ProductFormPageEdit = lazy(() => import("./pages/form/product/edit/ProductFormPageEdit.jsx"));

const Gallery = lazy(() => import("./components/galleryImgs/Gallery"));
//const ListProduct = lazy(() => import("./pages/listProduct/listProduc"));
const PreviewProduct = lazy(() => import("./pages/preview/PreviewProduct"));

export default function RouteWeb() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            {/*Usuarios*/}
            <Route path="/login" element={<Login />} />
            <Route path="/choice" element={<Choice />} />
            <Route path="/admin/users" element={<ListUser />} />
            <Route path="/admin/user/register" element={<UserRegister />} />
            <Route path="/admin/user/edit/:userid" element={<UserFormEdit />} />
            <Route path="/admin/product/create" element={<ProductFormCreate />} />
            <Route path="/admin/product/edit/:productid" element={<ProductFormPageEdit />} />
            <Route path="admin/register" element={<UserRegister />} />
            <Route path="admin/edit/:userid" element={<UserFormEdit />} />
            {/*Produto*/}
            <Route path="/admin/product/register" element={<Gallery/>}/>

            <Route path="/user/product" element={<PreviewProduct/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
