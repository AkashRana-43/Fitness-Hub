import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/topbar/sidebar/Sidebar";
import "./app.css"
import Home from "./components/pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import UserList from "./components/pages/userList/UserList";
import User from "./components/pages/user/User";
import NewUser from "./components/pages/newUser/NewUser";
import BulkMail from "./components/pages/bulkMail/BulkMail";

function App() {
  return (
    <Router>
      <Topbar/>
      <div className="container">
        <Sidebar/>
        <Routes>
          {/*Route component for setting up the path, element prop for rendering the Home component */}
          <Route path="/" element={<Home />} /> 
          <Route path="/users" element={<UserList />} />
          {/* Route for rendering the User component with a dynamic userId parameter */}
          <Route path="/user/:userId" element={<User />}/> 
          <Route path="/newUser" element={<NewUser/>}/>
          <Route path="/bulkMail" element={<BulkMail/>}/>
        </Routes>
        
        
      </div>
    </Router>
  );
}

export default App;
