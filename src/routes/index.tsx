import { Routes, Route, Navigate } from "react-router";
import Layout from "../layout";
import Dashboard from "../features/Dashboard";
import Tasks from "../features/Tasks";
import Task from "../features/Tasks/Task";
import VitalTasks from "../features/Tasks/VitalTasks";
import ChangePassword from "../features/ChangePassword";
import Login from "../features/auth/login";
import Register from "../features/auth/register";
import RequireAuth from "../components/RequireAuth";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* public routes */}
      {/* private routes */}
      <Route index element={<Navigate to="/dashboard" />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks">
          <Route index element={<Tasks />} />
          <Route path=":id" element={<Task />} />
          <Route path="vital-tasks" element={<VitalTasks />} />
        </Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/propfile-info" element={<ChangePassword />} />
        <Route path="/category" element={<ChangePassword />}>
          <Route path="create" element={<ChangePassword />} />
        </Route>
      </Route>
      {/* private routes */}
    </Routes>
  );
};

export default AppRoutes;
