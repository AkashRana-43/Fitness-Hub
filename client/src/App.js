import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "ClientPanel/utils/AuthContext";

// Import styles
import "bootstrap/scss/bootstrap.scss";
import './ClientPanel/assets/customCSS/custom.css';
import "./ClientPanel/assets/scss/paper-kit.scss";
import "./App.css";

// Import pages and components
import Home from './ClientPanel/pages/Home';
import Profile from "ClientPanel/pages/Profile";
import ProfileId from "ClientPanel/pages/ProfileId"; // Import ProfileId page
import Login from "ClientPanel/pages/Login";
import Register from "ClientPanel/pages/Register";
import Member from "ClientPanel/pages/Member";
import About from "ClientPanel/pages/About";
import Layout from "ClientPanel/layout/Layout";

// Import admin components
import Topbar from "./admin/components/topbar/Topbar";
import Sidebar from "./admin/components/topbar/sidebar/Sidebar";
import AdminHome from "./admin/components/pages/home/Home";
import UserList from "./admin/components/pages/userList/UserList";
import User from "./admin/components/pages/user/User";
import NewUser from "./admin/components/pages/newUser/NewUser";
import BulkMail from "./admin/components/pages/bulkMail/BulkMail";

function App() {
  const { isLoggedIn, isAdmin } = useAuth();

  if (isAdmin) {
    return (
      <BrowserRouter>
<<<<<<< HEAD
       
      
       <Topbar/>
            <div className="adminContainer">
              
          
              <Sidebar/>
              <Routes>

                <Route path="/admin" element={<AdminHome />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/newUser" element={<NewUser />} />
                <Route path="/bulkMail" element={<BulkMail />} />
              </Routes>
            </div>
      </BrowserRouter>    
=======
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
      </BrowserRouter>
>>>>>>> 27b769a (update)
    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={isLoggedIn ? <Layout showFooter={false}><Profile /></Layout> : <Navigate to='/' />} />
            <Route path='/profile/:userId' element={isLoggedIn ? <Layout showFooter={false}><ProfileId /></Layout> : <Navigate to='/' />} /> 
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/members' element={isLoggedIn ? <Layout showFooter={false}><Member /></Layout> : <Navigate to='/' />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
