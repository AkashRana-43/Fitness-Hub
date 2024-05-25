import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userType, setUserType] = useState(null);
  const [expiry, setExpiry] = useState(null); // Store session expiry

  useEffect(() => {
    const session = sessionStorage.getItem('session');
    const userType = localStorage.getItem('user_type');
    const expiry = sessionStorage.getItem('expiry'); // Get expiry from sessionStorage

    console.log("Session:", session, "User Type:", userType, "Expiry:", expiry);

    if (session && expiry && Date.now() < parseInt(expiry, 10)) {
      setIsLoggedIn(true);
      setExpiry(parseInt(expiry, 10));
    }

    if (userType) {
      setUserType(userType);
      if (userType === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  const navigate = useCallback((path) => {
    window.location.href = path;
  }, []);

  const handleLogin = useCallback((userData) => {
    setIsLoggedIn(true);
    setUserType(userData.user_type);
    if (userData.user_type === 'admin') {
      setIsAdmin(true);
    }
    setExpiry(userData.expiry); // Set expiry in state
    sessionStorage.setItem('session', userData.session);
    localStorage.setItem('user_type', userData.user_type);
    sessionStorage.setItem('expiry', userData.expiry); // Store expiry in sessionStorage
    navigate('/');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserType(null);
    sessionStorage.removeItem('session');
    localStorage.removeItem('user_type');
    sessionStorage.removeItem('expiry'); // Remove expiry from sessionStorage
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    // Check session expiry every minute
    const interval = setInterval(() => {
      if (expiry && Date.now() > expiry) {
        handleLogout();
        sessionStorage.removeItem('session');
        localStorage.removeItem('user_type');
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
