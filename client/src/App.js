import { BrowserRouter, Route, Routes } from "react-router-dom";


//styles
import "bootstrap/scss/bootstrap.scss";
import './ClientPanel/assets/customCSS/custom.css';
import "./ClientPanel/assets/scss/paper-kit.scss";


// pages
import Home from './ClientPanel/pages/Home'
import Profile from "ClientPanel/pages/Profile";
import Login from "ClientPanel/pages/Login";
import Register from "ClientPanel/pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
