import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gigmatch_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            localStorage.setItem('gigmatch_user', JSON.stringify(currentUser));
          }
        } catch (e) {
          // Token invalid or offline fallback
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('gigmatch_user', JSON.stringify(data.user));
    }
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('gigmatch_user', JSON.stringify(data.user));
    }
    return data;
  };

  const verifyOTPAndAuthenticate = async (otpData) => {
    const data = await authService.verifyOTP(otpData);
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('gigmatch_user', JSON.stringify(data.user));
    }
    return data;
  };

  const loginWithGoogle = async ({ credential, role }) => {
    const data = await authService.googleAuth({ credential, role });
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('gigmatch_user', JSON.stringify(data.user));
    }
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      sendOTP: authService.sendOTP,
      verifyOTPAndAuthenticate,
      loginWithGoogle,
      logout,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
