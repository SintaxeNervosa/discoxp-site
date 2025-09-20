import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { lazy, Suspense } from "react";
import { protectdRoutes } from "./context/ProtectdRoutes.jsx";

const Login = lazy(() => import("./pages/login/login.jsx"));
const ListUser = lazy(() => import("./pages/listUser/listUser.jsx"));
const Choice = lazy(() => import("./pages/choice/choice.jsx"));
const UserRegister = lazy(() => import("./pages/userForm/create/UserFormPage.jsx"));
const UserFormEdit = lazy(() => import("./pages/userForm/edit/UserFormEdit.jsx"));
const ProductFormCreate = lazy(() => import("./pages/form/product/create/ProductFormCreate.jsx"));
const ProductFormPageEdit = lazy(() => import("./pages/form/product/edit/ProductFormPageEdit.jsx"));
const ListProduct = lazy(() => import("./pages/listProduct/listProduc.jsx"));

const Gallery = lazy(() => import("./components/galleryImgs/Gallery"));
const PreviewProduct = lazy(() => import("./pages/preview/PreviewProduct"));

export default function RouteWeb() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            {/*Usuarios*/}
            <Route path="/login" element={<Login />} />

            <Route path="/choice" element={
              <protectdRoutes requireDtype={"STOCKIST" || "ADMIN"}>
                <Choice />
              </protectdRoutes>} />
            <Route path="/admin/list-products" element={
              <protectdRoutes requireDtype={"STOCKIST" || "ADMIN"}>
                <ListProduct />
              </protectdRoutes>} />
            <Route path="/admin/product/edit/:productid" element={
              <protectdRoutes requireDtype={"STOCKIST" || "ADMIN"}>
                <ProductFormPageEdit />
              </protectdRoutes>} />

            <Route path="/admin/users" element={
              <protectdRoutes requireDtype={"ADMIN"}>
                <ListUser />
              </protectdRoutes>} />
            <Route path="/admin/user/register" element={
              <protectdRoutes requireDtype={"ADMIN"}>
                <UserRegister />
              </protectdRoutes>} />
            <Route path="/admin/user/edit/:userid" element={
              <protectdRoutes requireDtype={"ADMIN"}>
                <UserFormEdit />
              </protectdRoutes>} />
            <Route path="/admin/product/create" element={
              <protectdRoutes requireDtype={"ADMIN"}>
                <ProductFormCreate />
              </protectdRoutes>} />
            <Route path="admin/register" element={
              <protectdRoutes requireDtype={"ADMIN"}>
                <UserRegister />
              </protectdRoutes>} />
            <Route path="admin/edit/:userid" element={
              <protectdRoutes requireDtype={"ADMIN"}>
                <UserFormEdit />
              </protectdRoutes>} />
            {/*Produto*/}
            <Route path="/admin/product/register" element={<Gallery />} />

            <Route path="/admin/product/:productid" element={<PreviewProduct />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
