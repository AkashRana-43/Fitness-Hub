import "./sidebar.css";
import {LineStyle, Timeline, TrendingUp, PersonOutline, Inventory, Paid, Report, Email,  Feedback, Forum, ManageAccounts} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <Link to="/" className="link">
                        <li className="sidebarListItem active">
                            <LineStyle className="sidebarIcon"/>
                            Home
                        </li>
                    </Link>
                    
                    
                    <li className="sidebarListItem">
                        <Timeline className="sidebarIcon"/>
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <TrendingUp className="sidebarIcon"/>
                        Sales
                    </li>
                    
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Menu</h3>
                <ul className="sidebarList">
                    <Link to ="/users" className="link">
                        <li className="sidebarListItem">
                            <PersonOutline className="sidebarIcon"/>
                            Users
                        </li>
                    </Link>
                    
                    
                    <li className="sidebarListItem">
                        <Inventory className="sidebarIcon"/>
                        Products
                    </li>
                    <li className="sidebarListItem">
                        <Paid className="sidebarIcon"/>
                        Transactions
                    </li>
                    <li className="sidebarListItem">
                        <Report className="sidebarIcon"/>
                        Reports
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                    <Link to="/bulkMail" className="link">
                        <li className="sidebarListItem">
                            <Email className="sidebarIcon"/>
                            Mail
                        </li>
                    </Link>
                    
                    <li className="sidebarListItem">
                        <Feedback className="sidebarIcon"/>
                        Feedback
                    </li>
                    <li className="sidebarListItem">
                        <Forum className="sidebarIcon"/>
                        Messages
                    </li>
                    
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Trainers</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <ManageAccounts className="sidebarIcon"/>
                        Manage
                    </li>
                    <li className="sidebarListItem">
                        <Timeline className="sidebarIcon"/>
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <Report className="sidebarIcon"/>
                        Reports
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
  )
}
