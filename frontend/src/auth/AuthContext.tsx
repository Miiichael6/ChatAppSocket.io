import { createContext, useCallback, useState, useContext } from 'react';
import axios from "axios";
import { types } from "../types/chat-types";
import { ChatContext } from '../context/chat/ChatContext';

export const AuthContext = createContext<any>({});

interface AuthProvider {
  children: React.ReactNode;
}

interface InitialState {
  uid: null | string;
  checking: boolean;
  logged: boolean;
  name: null | string;
  email: null | string;
}

const initialState: InitialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

const AuthProvider = ({ children }: AuthProvider) => {
  const [auth, setAuth] = useState<InitialState>(initialState);
  const { dispatch } = useContext(ChatContext)

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      if (data.user.uid) {
        const { uid, nombre, email } = data.user;
        localStorage.setItem("token", data.token);
        setAuth({
          uid: uid,
          checking: false,
          name: nombre,
          email: email,
          logged: true,
        });
      }

      return data.user.uid ? true : false;
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  const register = async (nombre: string, email: string, password: string) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login/new`,
        {
          nombre,
          email,
          password,
        }
      );

      if (data.user.uid) {
        const { uid, nombre, email } = data.user;
        localStorage.setItem("token", data.token);
        setAuth({
          uid: uid,
          checking: false,
          name: nombre,
          email: email,
          logged: true,
        });
      }

      return { ok: data.user.uid ? true : false };
    } catch (error: any) {
      return error.response.data;
    }
  };

  const verifyToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
        });
        return false;
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/login/renew`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.user.uid) {
        localStorage.setItem("token", data.token);
        const { uid, nombre, email } = data.user;
        setAuth({
          uid: uid,
          checking: false,
          logged: true,
          name: nombre,
          email: email,
        });
        return true
      } else {
        setAuth(initialState);
        return false;
      }

    } catch (error: any) {
      console.log(error.response.data);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token")
    setAuth({...initialState, checking: false});
    dispatch({type: types.purgarData })
  };

  const data = { login, register, verifyToken, logout, auth };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
