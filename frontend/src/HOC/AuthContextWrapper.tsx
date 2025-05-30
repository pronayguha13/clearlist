import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { login, register } from "../services/api";
import type { LoginCredentials, UserDetail } from "../types/Auth";

const AuthContextWrapper = ({ children }: ContextWrapperProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem("accessToken") ? true : false);

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
    console.log("Logging out...")
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login")
  }


  const registerHandler = async (credential: UserDetail) => {
    try {
      const response = await register(credential);
      console.log('🚀 ~ registerHandler ~ response:', response)

      if (response) {
        navigate("/login")
      }
    } catch (error) {
      window.alert("Failed to register user")
    }
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log('🚀 ~ useEffect ~ accessToken:', accessToken)

    accessToken && accessToken.length ? setIsAuthenticated(true) : setIsAuthenticated(false);

  }, [window.location.pathname])


  return (
    <AuthContext.Provider value={{
      isAuthenticated: isAuthenticated,
      login: loginHandler,
      logout: logoutQuery,
      register: registerHandler
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextWrapper
