import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectRoutes } from "./context/ProtectRoutes.jsx";

const Login = lazy(() => import("./pages/login/login.jsx"));
const ListUser = lazy(() => import("./pages/listUser/listUser.jsx"));
const Choice = lazy(() => import("./pages/choice/choice.jsx"));
const UserRegister = lazy(() => import("./pages/userForm/create/UserFormPage.jsx"));
const UserFormEdit = lazy(() => import("./pages/userForm/edit/UserFormEdit.jsx"));
const ProductFormCreate = lazy(() => import("./pages/form/product/create/ProductFormCreate.jsx"));
const ProductFormPageEdit = lazy(() => import("./pages/form/product/edit/ProductFormPageEdit.jsx"));
const ListProduct = lazy(() => import("./pages/listProduct/listProduc.jsx"));

const Home = lazy(() => import("./pages/home/home.jsx"));

const Gallery = lazy(() => import("./components/galleryImgs/Gallery"));
const PreviewProduct = lazy(() => import("./pages/preview/PreviewProduct"));

const NotFound = lazy(() => import("./pages/notFound/NotFound.jsx"));
export default function RouteWeb() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            {/*Usuarios*/}
            <Route path="/" element={<Login />} />

            <Route path="/choice" element={
              <ProtectRoutes requiredType={["STOCKIST", "ADMIN"]}>
                <Choice />
              </ProtectRoutes>} />
            <Route path="/list-products" element={
              <ProtectRoutes requiredType={["STOCKIST", "ADMIN"]}>
                <ListProduct />
              </ProtectRoutes>} />
            <Route path="/admin/product/edit/:productid" element={
              <ProtectRoutes requiredType={["STOCKIST", "ADMIN"]}>
                <ProductFormPageEdit />
              </ProtectRoutes>} />

            <Route path="/admin/users" element={
              <ProtectRoutes requiredType={["ADMIN"]}>
                <ListUser />
              </ProtectRoutes>} />
            <Route path="/admin/user/register" element={
              <ProtectRoutes requiredType={["ADMIN"]}>
                <UserRegister />
              </ProtectRoutes>} />
            <Route path="/admin/user/edit/:userid" element={
              <ProtectRoutes requiredType={["ADMIN"]}>
                <UserFormEdit />
              </ProtectRoutes>} />
            <Route path="/admin/product/create" element={
              <ProtectRoutes requiredType={["ADMIN"]}>
                <ProductFormCreate />
              </ProtectRoutes>} />
            <Route path="admin/register" element={
              <ProtectRoutes requiredType={["ADMIN"]}>
                <UserRegister />
              </ProtectRoutes>} />
            <Route path="admin/edit/:userid" element={
              <ProtectRoutes requiredType={["ADMIN"]}>
                <UserFormEdit />
              </ProtectRoutes>} />
            {/*Produto*/}
            <Route path="/admin/product/gallery" element={
              <ProtectRoutes requiredType={["ADMIN"]}>
                <Gallery />
              </ProtectRoutes>
            }>
            </Route>
            {/*Produto*/}
            <Route path="/admin/product/gallery/:productid" element={
              <ProtectRoutes requiredType={["ADMIN"]}>
                <Gallery />
              </ProtectRoutes>
            }>
            </Route>
            <Route path="/admin/product/:productid" element={<PreviewProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
