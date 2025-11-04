import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectRoutes } from "./context/ProtectRoutes.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const Login = lazy(() => import("./pages/login/login.jsx"));
const ClientLogin = lazy(() => import("./pages/user-login/clientLogin.jsx"));
const ListUser = lazy(() => import("./pages/listUser/listUser.jsx"));
const Choice = lazy(() => import("./pages/choice/choice.jsx"));
const UserRegister = lazy(() => import("./pages/userForm/create/UserFormPage.jsx"));
const UserFormEdit = lazy(() => import("./pages/userForm/edit/UserFormEdit.jsx"));
const ProductFormCreate = lazy(() => import("./pages/form/product/create/ProductFormCreate.jsx"));
const ProductFormPageEdit = lazy(() => import("./pages/form/product/edit/ProductFormPageEdit.jsx"));
const ListProduct = lazy(() => import("./pages/listProduct/listProduc.jsx"));
const ClientResgister = lazy(() => import("./pages/client/register/Register.jsx"));

const Home = lazy(() => import("./pages/home/home.jsx"));
const InformationProduct = lazy(() => import("./pages/informationProduct/InformationProduct.jsx"));
const Profile = lazy(() => import("./pages/profileUser/profile.jsx"))
const OrderForm = lazy(() => import("./pages/orderForm/orderForm.jsx"))

const Gallery = lazy(() => import("./components/galleryImgs/Gallery"));
const PreviewProduct = lazy(() => import("./pages/preview/PreviewProduct"));

// const PageCart = lazy(() => import("./pages/cartTest/CartTest.jsx"))
const Finalization = lazy(() => import("./pages/finalization/finalization.jsx"))

const NotFound = lazy(() => import("./pages/notFound/NotFound.jsx"));

export default function RouteWeb() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Suspense fallback={<div>Carregando...</div>}>
            <Routes>
              {/*Usuarios*/}
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />

              <Route path="/profile" element={
                <ProtectRoutes requiredType={["CLIENT"]}>
                  <Profile />
                </ProtectRoutes>
              } />

              <Route path="/product/:productid" element={<InformationProduct />} />
              <Route path="/order" element={
                <ProtectRoutes requiredType={["CLIENT"]}>
                  <OrderForm />
                </ProtectRoutes>
              } />
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

              {/*<ProtectRoutes requiredType={["CLIENT"]} > </ProtectRoutes> */}
              <Route path="/login" element={<ClientLogin />} />


              {/*Produto*/}
              <Route path="/admin/product/gallery/:productid" element={
                <ProtectRoutes requiredType={["ADMIN"]}>
                  <Gallery />
                </ProtectRoutes>
              }>
              </Route>
              <Route path="/admin/product/:productid" element={<PreviewProduct />} />
              {/* <Route path="/cart" element={<PageCart />} /> */}
              <Route path="/register" element={<ClientResgister />}></Route>
              <Route path="*" element={<NotFound />} />
              {/*TESTE */}
              <Route path="/finalization" element={<Finalization />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}
