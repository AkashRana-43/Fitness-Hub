import { BrowserRouter, Route, Routes } from "react-router-dom";


//styles
import "bootstrap/scss/bootstrap.scss";
import './ClientPanel/assets/customCSS/custom.css';
import "./ClientPanel/assets/scss/paper-kit.scss";


// pages
import Home from './ClientPanel/pages/Home'
import Profile from "ClientPanel/pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/profile' element={ <Profile /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
