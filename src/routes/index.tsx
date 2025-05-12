import { Routes, Route, Navigate } from "react-router"
import Layout from "../layout";
import Dashboard from "../features/Dashboard";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;