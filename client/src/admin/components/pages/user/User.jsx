import "./user.css";
// import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import {CalendarToday, LocationSearching, MailLockOutlined, PermIdentity, PhoneAndroid, Publish} from '@mui/icons-material';
export default function User() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const sessionId = sessionStorage.getItem('session'); // Get the sessionId from localStorage
    console.log(sessionId);

    const {userId} = useParams();
    console.log(userId);
    /*useEffect(() => {
        
        fetch('http://localhost:3001/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'session': sessionId // Pass the sessionId in the header
            }
        })
        .then(res => res.json()) // Convert the response to JSON
        .then(data => console.log(data)) // Log the data
        .catch(err => console.log(err));
    }, []); */

    const handleUpdate = (e) => {
        e.preventDefault();
    
        // Construct the updated user data object
        const updatedUserData = {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            address: address
        };
    
        // Send a PUT request to update the user data
        fetch('http://localhost:3001/profile/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'session': sessionId // Pass the sessionId in the header
            },
            body: JSON.stringify(updatedUserData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); // Log the response data
            // Optionally, you can update the form fields or show a success message
        })
        .catch(err => console.log(err));
    };
    
    
  return (
    <div className="user">
        <div>
            <h1 className="userTitle">Edit User</h1>
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
                <form action="" className="userUpdateForm" onSubmit={handleUpdate}>
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>First Name</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="robert99" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label>Last Name</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Kiyosaki" className="userUpdateInput" />
                        </div>
                        {/* <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="text" placeholder="robert99@gmail.com" className="userUpdateInput" />
                        </div> */}
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0406687956" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Keswick, Adelaide" className="userUpdateInput" />
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
