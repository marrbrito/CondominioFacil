/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  usuario: object;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  usuario: object;
  signIn(credenctials: Credentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CFacil:token');
    const usuario = localStorage.getItem('@CFacil:usuario');

    if (token && usuario) {
      return { token, usuario: JSON.parse(usuario) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('session', {
      email,
      password,
    });

    const { token, usuario } = response.data;

    localStorage.setItem('@CFacil:token', token);
    localStorage.setItem('@CFacil:usuario', JSON.stringify(usuario));

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CFacil:token');
    localStorage.removeItem('@CFacil:usuario');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: data.usuario, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
