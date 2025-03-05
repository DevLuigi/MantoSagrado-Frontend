import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginAdmin from './pages/admin/login';
import RegisterAdmin from './pages/admin/register';
import UpdateAdmin from './pages/admin/update';
import MenuAdmin from './pages/admin/menu';
import ManagementAdmin from "./pages/admin/management";
import ProductManagementScreen from "./pages/admin/product";
import ProductRegister from "./pages/admin/product-register";
import ProductUpdate from "./pages/admin/product-update";

export default function RoutesProject() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={<LoginAdmin />}/>
                <Route path="/admin/register" element={<RegisterAdmin />}/>
                <Route path="/admin/update" element={<UpdateAdmin />}/>
                <Route path="/admin/menu" element={<MenuAdmin />}/>
                <Route path="/admin/management" element={<ManagementAdmin />}/>

                <Route path="/admin/product" element={<ProductManagementScreen />}/>
                <Route path="/admin/product/register" element={<ProductRegister />}/>
                <Route path="/admin/product/update" element={<ProductUpdate />}/>
            </Routes>
        </BrowserRouter>
    )
}