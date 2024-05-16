import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./topbar.css"
import {NotificationsNone, Language, Settings} from '@mui/icons-material';
import { useAuth } from '../../../ClientPanel/utils/AuthContext';

export default function Topbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { handleLogout } = useAuth();

    const logoutAndNavigateHome = () => {
        handleLogout(); // Logout user
        navigate('/'); // Navigate to home directory
      };
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                 <span className="logo">Fitness Hub</span>   
            </div>
            <div className='topRight'>
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language />
                    <span className="topIconBadge">2</span>
                </div> 
                <div className="topbarIconContainer" onClick={() => setShowDropdown(!showDropdown)}>
                    <Settings />
                    {showDropdown && (
                        <div className="dropdown">
                            <ul>
                            <li onClick={logoutAndNavigateHome}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>  
                <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="topAvatar" />       
            </div>
        </div>
      
    </div>
  )
}
