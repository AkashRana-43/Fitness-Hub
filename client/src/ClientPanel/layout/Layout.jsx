import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useAuth } from 'ClientPanel/utils/AuthContext';

const Layout = ({ children }) => {

  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
