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

export default function RoutesProject() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={<LoginAdmin />}/>
                <Route path="/admin/menu" element={<MenuAdmin />}/>

                {/* User */}
                <Route path="/admin/user/management" element={<UserManagementAdmin />}/>
                <Route path="/admin/user/register" element={<UserRegisterAdmin />}/>
                <Route path="/admin/user/update" element={<UserUpdateAdmin />}/>
                
                {/* Product */}
                <Route path="/admin/product/management" element={<ProductManagementAdmin />}/>
                <Route path="/admin/product/register" element={<ProductRegisterAdmin />}/>
                <Route path="/admin/product/update" element={<ProductUpdateAdmin />}/>
                <Route path="/admin/product/productPreview" element={<ProductPreview />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/" element={<Shop />}/>
            </Routes>
        </BrowserRouter>
    )
}