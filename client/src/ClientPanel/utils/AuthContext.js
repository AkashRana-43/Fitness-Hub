import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  

  useEffect(() => {
    const session = localStorage.getItem('session');
    const userType = localStorage.getItem('user_type'); // Get user_type from localStorage
    if (session) {
      
      setIsLoggedIn(true);
      
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
    localStorage.removeItem('session');
    localStorage.removeItem('user_type');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
