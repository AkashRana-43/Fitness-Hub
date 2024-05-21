import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ProfilePage.css';
import Img1 from '../../assets/img/bg/BG.jpg';
import { useAuth } from 'ClientPanel/utils/AuthContext'; // Import useAuth

const ProfileId = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { userType: loggedInUserType } = useAuth(); // Get logged-in user's userType

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const closeForm = () => {
        setShowPopup(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        togglePopup();
    };

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        axios.get(`http://localhost:3001/profile/${userId}`, {
            headers: {
                'session': session,
            }
        })
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const userType = user.user.user_type;

    const renderButton = () => {
        if (loggedInUserType === 'normal') { // Check if the logged-in user's type is 'normal'
            if (userType === 'trainer') {
                return (
                    <div className="col-lg-4 order-last text-center">
                        <button className="btn mx-4" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }} onClick={togglePopup}>Request Diet</button>
                    </div>
                );
            } else if (userType === 'normal') {
                return (
                    <div className="col-lg-4 order-last text-center">
                        <button className="btn mx-4" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }}>Create Diet</button>
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <>
            <section className="card-body p-0">
                <div className='cover-pic'>
                    <img src={Img1} alt="" className="img-fluid" />
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-4 order-lg-1 order-2">

                    </div>

                    <div className="col-lg-4 mt-n3 order-lg-2 order-1">
                        <div className="mt-n5">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <div className="linear-gradient d-flex align-items-center justify-content-center rounded-circle" style={{ width: '110px', height: '110px' }}>
                                    <div className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden" style={{ width: '100px', height: '100px' }}>
                                        <img src={Img1} alt="" className="w-100 h-100" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {/* Display user name and type */}
                                <h5 className="fs-5 mb-0 fw-semibold">{user.first_name}</h5>
                                <p className="mb-0 fs-4">{userType}</p> {/* Display userType */}
                            </div>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="popup-overlay" style={{ padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="popup-content nav nav-pills user-profile-tab justify-content-center mt-0 rounded-2" style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)" }}>

                                <form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%', textAlign: 'center' }}>
                                    <h6 style={{ textAlign: 'center', marginBottom: '20px' }}>Request Diet</h6>
                                    <div style={{ paddingBottom: '20px' }}>
                                        QR Code
                                    </div>
                                    <div className="form-group">
                                        <textarea id="Request" style={{ width: '100%', minHeight: '100px' }}></textarea>
                                    </div>
                                    <button type="submit" className="btn" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }}>Submit</button>
                                </form>

                            </div>
                        </div>
                    )}

                    {renderButton()}
                </div>
            </section>
        </>
    );
}

export default ProfileId;
