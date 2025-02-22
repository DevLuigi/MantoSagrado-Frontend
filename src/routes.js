import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginAdmin from './pages/admin/login';
import RegisterAdmin from './pages/admin/register';

export default function RoutesProject() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={<LoginAdmin />}/>
                <Route path="/admin/register" element={<RegisterAdmin />}/>
            </Routes>
        </BrowserRouter>
    )
}