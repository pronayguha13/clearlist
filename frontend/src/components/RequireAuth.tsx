// /components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router";
import useAuthContext from "../context/AuthContext";
const RequireAuth = ({ children }: ContainerComponentProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext()
  console.log('🚀 ~ RequireAuth ~ isAuthenticated:', isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
