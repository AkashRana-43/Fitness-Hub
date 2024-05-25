import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userType, setUserType] = useState(null);
  const [expiry, setExpiry] = useState(null); // Store session expiry

  useEffect(() => {
    const session = sessionStorage.getItem('session');
    const userType = localStorage.getItem('userType');
    const expiry = sessionStorage.getItem('expiry'); // Get expiry from sessionStorage

    if (session && expiry && Date.now() < parseInt(expiry, 10)) {
      setIsLoggedIn(true);
      setExpiry(parseInt(expiry, 10));
    }

    if (userType) {
      setUserType(userType);
      setIsAdmin(userType === 'admin');
    }
  }, []);

  const navigate = useCallback((path) => {
    window.location.href = path;
  }, []);

  const handleLogin = useCallback((userData) => {
    setIsLoggedIn(true);
    setUserType(userData.user_type);
    setIsAdmin(userData.user_type === 'admin');
    const expiryTime = Date.now() + 15 * 60 * 1000;
    setExpiry(expiryTime); // Set expiry in state
    sessionStorage.setItem('session', userData.session);
    localStorage.setItem('userType', userData.user_type);
    sessionStorage.setItem('expiry', expiryTime); // Store expiry in sessionStorage
    navigate('/');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserType(null);
    sessionStorage.removeItem('session');
    localStorage.removeItem('userType');
    sessionStorage.removeItem('expiry'); // Remove expiry from sessionStorage
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    // Check session expiry every minute
    const interval = setInterval(() => {
      if (expiry && Date.now() > expiry) {
        handleLogout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [expiry, handleLogout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, userType, handleLogin, handleLogout, navigate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
