import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//styles
import "bootstrap/scss/bootstrap.scss";
import './ClientPanel/assets/customCSS/custom.css';
import "./ClientPanel/assets/scss/paper-kit.scss";


// pages
import Home from './ClientPanel/pages/Home'
import Profile from "ClientPanel/pages/Profile";
import Login from "ClientPanel/pages/Login";
import Register from "ClientPanel/pages/Register";
import { useAuth } from "ClientPanel/utils/AuthContext";
import Layout from "ClientPanel/layout/Layout";
import Member from "ClientPanel/pages/Member";

function App() {

  const {isLoggedIn} = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/profile' element={isLoggedIn? <Layout><Profile /> </Layout> : <Navigate to= '/' /> } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={ <Register /> } />
          <Route path='/members' element={ <Member /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
