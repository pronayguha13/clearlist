import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/api";
import type { LoginCredentials } from "../types/Auth";

const AuthContextWrapper = ({ children }: ContextWrapperProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loginHandler = async (credential: LoginCredentials) => {
    try {
      const response = await login(credential);
      if (response) {
        console.log(response)
        const { access, refresh } = response;

        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh)
        setIsAuthenticated(true)
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error);
      window.alert("Failed to login")
    }
  }

  const logoutQuery = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }

  }, [window.location.pathname])


  return (
    <AuthContext.Provider value={{
      isAuthenticated: isAuthenticated,
      login: loginHandler,
      logout: logoutQuery,
      register: () => console.log("Register user")
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextWrapper
