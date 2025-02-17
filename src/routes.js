import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginAdmin from './pages/admin/login';

export default function RoutesProject() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={<LoginAdmin />}/>
            </Routes>
        </BrowserRouter>
    )
}