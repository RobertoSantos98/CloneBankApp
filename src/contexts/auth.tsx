import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { SERVER } from "../config";

import { User } from '../types';

interface AuthContextType {
  user?: User;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User>();

  // Mantém sessão ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('USER');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  async function login(email: string, senha: string): Promise<any> {

    const usuario = {
      email: email,
      password: senha
    }

    try {
      const response = await axios.post(`${SERVER}/Auth`, usuario, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      await AsyncStorage.setItem('USER', JSON.stringify(response.data.data));

      setUser(response.data.data);
      return response.data.data;

    } catch (error: any) {
      throw new Error(error?.response?.data?.errorMessage || 'Não foi possível');
    }
  };

  async function logout() {
    await AsyncStorage.removeItem('USER');
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ login, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
