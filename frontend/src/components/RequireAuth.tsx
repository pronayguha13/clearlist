// /components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }: ContainerComponentProps) => {
  const { isAuthenticated } = useAuth(); // your own auth logic
  const location = useLocation();

  if (!!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
