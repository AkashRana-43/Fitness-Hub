import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/aboutus' element={ <AboutUs /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
