import "./widgetSm.css";
import {Visibility} from '@mui/icons-material';

export default function WidgetSm() {
  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            <li className="widgetSmListItem">
                {/* process.env.PUBLIC_URL variable provided by Create React App
                contains base URL of app */}
                <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetSmImg"/> 
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Mingmar Tamang</span>
                    <span className="widgetSmUserTitle">Software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className ="widgetSmIcon"/>
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                {/* process.env.PUBLIC_URL variable provided by Create React App
                contains base URL of app */}
                <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetSmImg"/> 
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Mingmar Tamang</span>
                    <span className="widgetSmUserTitle">Software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className ="widgetSmIcon"/>
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                {/* process.env.PUBLIC_URL variable provided by Create React App
                contains base URL of app */}
                <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetSmImg"/> 
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Mingmar Tamang</span>
                    <span className="widgetSmUserTitle">Software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className ="widgetSmIcon"/>
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                {/* process.env.PUBLIC_URL variable provided by Create React App
                contains base URL of app */}
                <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetSmImg"/> 
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Mingmar Tamang</span>
                    <span className="widgetSmUserTitle">Software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className ="widgetSmIcon"/>
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                {/* process.env.PUBLIC_URL variable provided by Create React App
                contains base URL of app */}
                <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetSmImg"/> 
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">Mingmar Tamang</span>
                    <span className="widgetSmUserTitle">Software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className ="widgetSmIcon"/>
                    Display
                </button>
            </li>
        </ul>
    </div>
  )
}
