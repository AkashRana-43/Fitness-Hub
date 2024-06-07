import React from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import { useAuth } from "./ClientPanel/utils/AuthContext"; // Adjust import path

// Import styles
import "bootstrap/scss/bootstrap.scss";
import './ClientPanel/assets/customCSS/custom.css';
import "./ClientPanel/assets/scss/paper-kit.scss";
import "./App.css";

// Import pages and components
import Home from './ClientPanel/pages/Home';
import Profile from "./ClientPanel/pages/Profile"; // Adjust import path
import Login from "./ClientPanel/pages/Login"; // Adjust import path
import Register from "./ClientPanel/pages/Register"; // Adjust import path
import Member from "./ClientPanel/pages/Member"; // Adjust import path
import About from "./ClientPanel/pages/About"; // Adjust import path
import Layout from "./ClientPanel/layout/Layout"; // Adjust import path

// Import admin components
import Topbar from "./admin/components/topbar/Topbar";
import Sidebar from "./admin/components/topbar/sidebar/Sidebar";
import AdminHome from './admin/components/pages/home/Home';
import UserList from "./admin/components/pages/userList/UserList";
import User from "./admin/components/pages/user/User";
import NewUser from "./admin/components/pages/newUser/NewUser";
import BulkMail from "./admin/components/pages/bulkMail/BulkMail";
import ProfilePage from "./ClientPanel/pages/ProfilePage"; // Adjust import path

const ProfileIdWrapper = () => {
  let { userId } = useParams();
  console.log(userId);
  return <ProfilePage userId={userId} />;
}

const AppContent = () => {
  const { isLoggedIn, isAdmin } = useAuth() || {}; // Use default empty object if useAuth returns undefined
  console.log(isLoggedIn)
  return (
    <div className="App">
      {isAdmin ? (
        <>
          <Topbar />
          <div className="adminContainer">
            <Sidebar />
            <Routes>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/bulkMail" element={<BulkMail />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={isLoggedIn ? <Layout showFooter={false}><Profile /></Layout> : <Navigate to="/" />} />
          <Route path="/profile/:userId" element={<ProfileIdWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/members" element={isLoggedIn ? <Layout showFooter={false}><Member /></Layout> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      )}
    </div>
  );
};

const App = () => <AppContent />;

export default App;
