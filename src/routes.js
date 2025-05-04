import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginAdmin from './pages/admin/login';
import MenuAdmin from './pages/admin/menu';

import UserRegisterAdmin from './pages/admin/user/register';
import UserUpdateAdmin from './pages/admin/user/update';
import UserManagementAdmin from "./pages/admin/user/management";

import ProductManagementAdmin from "./pages/admin/product/management";
import ProductRegisterAdmin from "./pages/admin/product/register";
import ProductUpdateAdmin from "./pages/admin/product/update";
import ProductPreview from "./pages/admin/product/productPreview/index.js";

import Cart from "./pages/client/cart/index.js";
import Shop from "./pages/client/shop/index.js";

import ClientPreview from "./pages/client/preview/index.js";
import ClientLogin from "./pages/client/auth/login/index.js";
import ClientRegister from "./pages/client/auth/register/index.js";

import ListAddresses from "./pages/client/addressManagement/listAddresses/index.js";
import CreateAddress from "./pages/client/addressManagement/createAddress/index.js";
import ClientProfile from "./pages/client/profile/index.js";
import ClientUpdate from "./pages/client/auth/update/index.js";
import ViewOrder from "./pages/client/cartCheckout/viewOrder/index.js";

import Payment from "./pages/client/cartCheckout/payment/index.js";
import MyOrders from "./pages/client/orderManagement/listMyOrders/index.js";

export default function RoutesProject() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin routes */}
                <Route path="/admin/login" element={<LoginAdmin />} />
                <Route path="/admin/menu" element={<MenuAdmin />} />

                    {/* User */}
                    <Route path="/admin/user/management" element={<UserManagementAdmin />} />
                    <Route path="/admin/user/register" element={<UserRegisterAdmin />} />
                    <Route path="/admin/user/update" element={<UserUpdateAdmin />} />

                    {/* Product */}
                    <Route path="/admin/product/management" element={<ProductManagementAdmin />} />
                    <Route path="/admin/product/register" element={<ProductRegisterAdmin />} />
                    <Route path="/admin/product/update" element={<ProductUpdateAdmin />} />
                    <Route path="/admin/product/product-preview" element={<ProductPreview />} />
                
                {/* ========================================================================== */}
                {/* Client routes */}

                    {/* Auth */}
                    <Route path="/login" element={<ClientLogin />} />
                    <Route path="/register" element={<ClientRegister />} />

                    {/* Others */}
                    <Route path="/" element={<Shop />} />
                    <Route path="/product/client-preview" element={<ClientPreview />} />

                    {/* Profile */}
                    <Route path="/profile" element={<ClientProfile />} />
                    <Route path="/profile/update" element={<ClientUpdate />} />
                    <Route path="/profile/my-orders" element={<MyOrders />} />
                
                    {/* Address */}
                    <Route path="/address/list" element={<ListAddresses />}/>
                    <Route path="/address/create" element={<CreateAddress />}/>
                
                    {/* Cart */}
                    <Route path="/cart" element={<Cart />} />
                    
                    <Route path="/cart/checkout/payment" element={<Payment />}/>

                    <Route path="/client/cartCheckout/view-order" element={<ViewOrder />}/>
            </Routes>
        </BrowserRouter>
    )
}