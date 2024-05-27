import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userType, setUserType] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const navigate = useNavigate(); // Using useNavigate for navigation

  useEffect(() => {
    const session = sessionStorage.getItem('session');
    const userType = localStorage.getItem('user_type');
    const expiry = sessionStorage.getItem('expiry');

    if (session && expiry && Date.now() < parseInt(expiry, 10)) {
      setIsLoggedIn(true);
      setExpiry(parseInt(expiry, 10));
    }

    if (userType) {
      setUserType(userType);
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = useCallback((userData) => {
    setIsLoggedIn(true);
    setUserType(userData.user_type);
    setIsAdmin(userData.user_type === 'admin');
    const expiryTime = Date.now() + 15 * 60 * 1000;
    setExpiry(expiryTime);
    sessionStorage.setItem('session', userData.session);
    localStorage.setItem('user_type', userData.user_type);
    sessionStorage.setItem('expiry', expiryTime);
    navigate('/');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserType(null);
    sessionStorage.removeItem('session');
    localStorage.removeItem('user_type');
    sessionStorage.removeItem('expiry');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (expiry && Date.now() > expiry) {
        handleLogout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [expiry, handleLogout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, userType, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


