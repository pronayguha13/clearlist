import { createContext, useContext } from "react";
import { type LoginCredentials, type UserDetail } from "../types/Auth";
type IAuth = {
  isAuthenticated: boolean;
  login: (credential: LoginCredentials) => Promise<void>
  logout: () => void;
  register: (credential: UserDetail) => Promise<void>;
}

const initAuthState: IAuth = {
  isAuthenticated: false,
  login: () => {
    throw new Error("Login not implemented yet")
  },
  logout: () => {
    // throw new Error("logout method not yet implemented")
  },
  register: () => {
    throw new Error("register method not yet implemented")
  },
}

export const AuthContext = createContext(initAuthState);


const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
