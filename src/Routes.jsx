import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectRoutes } from "./context/ProtectRoutes.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import OrderList from "./pages/backoffice/general/orderList/OrderList.jsx";

const Login = lazy(() => import("./pages/backoffice/general/login/BackofficeLogin.jsx"));
const ClientLogin = lazy(() => import("./pages/client/login/ClientLogin.jsx"));
const ListUser = lazy(() => import("./pages/backoffice/admin/userList/UserList.jsx"));
const HomeBackoffice = lazy(() => import("./pages/backoffice/general/Home/HomeBackOffice.jsx"));
const UserRegister = lazy(() => import("./pages/backoffice/admin/userForm/create/Create.jsx"));
const UserFormEdit = lazy(() => import("./pages/backoffice/admin/userForm/edit/Edit.jsx"));
const ProductFormCreate = lazy(() => import("./pages/backoffice/admin/productForm/create/ProductFormCreate.jsx"));
const ProductFormPageEdit = lazy(() => import("./pages/backoffice/admin/productForm/edit/ProductFormPageEdit.jsx"));
const ListProduct = lazy(() => import("./pages/backoffice/general/productList/ProductList.jsx"));
const ClientResgister = lazy(() => import("./pages/client/register/Register.jsx"));

const HomeClient = lazy(() => import("./pages/client/home/Home.jsx"));
const InformationProduct = lazy(() => import("./pages/client/detailProduct/DetailProduct.jsx"));
const Profile = lazy(() => import("./pages/client/profile/Profile.jsx"))
const OrderForm = lazy(() => import("./pages/client/orderForm/OrderForm.jsx"))

const Gallery = lazy(() => import("./components/backoffice/admin/galleryImgs/Gallery.jsx"));
const PreviewProduct = lazy(() => import("./pages/backoffice/admin/productPreview/ProductPreview.jsx"));

// const PageCart = lazy(() => import("./pages/cartTest/CartTest.jsx"))
const Finalization = lazy(() => import("./pages/client/orderFinalization/OrderFinalization.jsx"))

const NotFound = lazy(() => import("./pages/web/notFound/NotFound.jsx"));

export default function RouteWeb() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Suspense fallback={<div>Carregando...</div>}>
            <Routes>
              {/*Usuarios*/}
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<HomeClient />} />

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
                  <HomeBackoffice />
                </ProtectRoutes>} />
              <Route path="/list-products" element={
                <ProtectRoutes requiredType={["STOCKIST", "ADMIN"]}>
                  <ListProduct />
                </ProtectRoutes>} />
              <Route path="/list-orders" element={
                <ProtectRoutes requiredType={["STOCKIST", "ADMIN"]}>
                  <OrderList />
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
              <Route path="/admin/product/:productid" element={
                <ProtectRoutes requiredType={["ADMIN"]}>
                  <PreviewProduct />
                </ProtectRoutes> 
              } />
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
