import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userType, setUserType] = useState(null); // Add userType state

  useEffect(() => {
    const session = sessionStorage.getItem('session');
    const userType = localStorage.getItem('user_type'); // Get user_type from localStorage
    if (session) {
      setIsLoggedIn(true);
    }
    if (userType) {
      setUserType(userType);
      if (userType === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const userType = localStorage.getItem('user_type');
    setUserType(userType);
    if (userType === 'admin') {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserType(null); // Clear userType
    sessionStorage.removeItem('session');
    localStorage.removeItem('user_type');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, userType, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
