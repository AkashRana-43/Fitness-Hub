import "./user.css";
import { Link } from 'react-router-dom';
import {CalendarToday, LocationSearching, MailLockOutlined, PermIdentity, PhoneAndroid, Publish} from '@mui/icons-material';
export default function User() {
  return (
    <div className="user">
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
                <button className="userAddButton">Create</button>
            </Link>
            
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src={process.env.PUBLIC_URL + "/images/admin.jpeg"} alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">Robert Kiyosaki</span>
                        <span className="userShowUserTitle">Investor</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className="userShowIcon"/>
                        <span className="userShowInfoTitle">robert99</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarToday className="userShowIcon"/>
                        <span className="userShowInfoTitle">02.01.1998</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className="userShowIcon"/>
                        <span className="userShowInfoTitle">0406687956</span>
                    </div>
                    <div className="userShowInfo">
                        <MailLockOutlined className="userShowIcon"/>
                        <span className="userShowInfoTitle">robert99@gmail.com</span>
                    </div>
                    <div className="userShowInfo">
                        <LocationSearching className="userShowIcon"/>
                        <span className="userShowInfoTitle">Keswick, Adelaide</span>
                    </div>
                    
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form action="" className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input type="text" placeholder="robert99" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input type="text" placeholder="Robert Kiyosaki" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="text" placeholder="robert99@gmail.com" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" placeholder="0406687956" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input type="text" placeholder="Keswick, Adelaide" className="userUpdateInput" />
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src={process.env.PUBLIC_URL + "/images/admin.jpeg"} alt="userimg" className="userUpdateImg" />
                            {/* htmlFor Associates this label with an input element using the 'htmlFor' attribute */}
                            <label htmlFor="file"><Publish className="userUpdateIcon"/></label>
                            <input type="file" name="" id="file" style={{display:"none"}} />
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
