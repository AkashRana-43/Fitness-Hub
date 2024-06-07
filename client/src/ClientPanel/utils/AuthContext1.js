import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [userType, setUserType] = useState(null);
  const [expiry, setExpiry] = useState(null); // Store session expiry

  useEffect(() => {
    const session = sessionStorage.getItem('session');
    const userType = localStorage.getItem('user_type');
    console.log(userType);
    const expiry = sessionStorage.getItem('expiry'); // Get expiry from sessionStorage

    if (session && expiry && Date.now() < parseInt(expiry, 10)) {
      setIsLoggedIn(true);
      setExpiry(parseInt(expiry, 10));
    }

    if (userType === 'admin') {
      
      setIsAdmin(true);
    }
  }, []);



  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('session', 'your_session_token_or_identifier_here');
    const userType = localStorage.getItem('user_type');
    if (userType === 'admin') {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    sessionStorage.removeItem('session');
    localStorage.removeItem('user_type');
  };

  useEffect(() => {
    // Check session expiry every minute
    const interval = setInterval(() => {
      if (expiry && Date.now() > expiry) {
        handleLogout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [expiry]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin,  handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);