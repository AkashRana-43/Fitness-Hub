import React from 'react'
import "./topbar.css"
import {NotificationsNone, Language, Settings} from '@mui/icons-material';

export default function Topbar() {
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
                <div className="topbarIconContainer">
                    <Settings />
                    
                </div>  
                <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="topAvatar" />       
            </div>
        </div>
      
    </div>
  )
}
