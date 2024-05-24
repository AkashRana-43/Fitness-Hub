import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ProfilePage.css';
import Img1 from '../../assets/img/bg/BG.jpg';

const ProfileId = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loggedInUserType, setLoggedInUserType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userType = localStorage.getItem('user_type');
        if (userType) {
            setLoggedInUserType(userType);
            setIsLoading(false);
        }
    }, []);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const closeForm = () => {
        setShowPopup(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        togglePopup()
        const session = sessionStorage.getItem('session');
        const requestData = {
            requested_to: userId,
            message: document.getElementById('Request').value 
        };
        console.log(requestData);
    
        try {
            const response = await fetch('http://localhost:3001/diet/submitRequest', {
                method: 'POST',
                headers: {
                    'session': session,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
    
            if (!response.ok) {
                throw new Error('Request failed with status: ' + response.status);
            }
    
            console.log('Request submitted successfully');

        } catch (error) {
            console.error('Error submitting request:', error.message);
        }
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

    if (isLoading || !user) {
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
                return null; //add if needed any button
            }
        }
        return null;
    };

    const renderProfile = () => {
        if (loggedInUserType === 'normal') {
            if (userType === 'trainer') {
                return null;
            } else if (userType === 'normal') {
                return (
                    <div className="row">
                        <div className="col">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h6 className="my-3">My Details</h6>
                                    <div className="row mb-2">
                                        <div className="col-md-3 text-muted">Height:</div>
                                        <div className="col-md-9">
                                            167 cm
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-3 text-muted">Weight:</div>
                                        <div className="col-md-9">
                                            70 kg
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-3 text-muted">Sex:</div>
                                        <div className="col-md-9">
                                            Female
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-3 text-muted">Body Type:</div>
                                        <div className="col-md-9">
                                            Fat
                                        </div>
                                    </div>
                                    <h6 className="my-3">Contacts</h6>
                                    <div className="row mb-2">
                                        <div className="col-md-3 text-muted">Phone:</div>
                                        <div className="col-md-9">
                                            +61 (04)45 678 910
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-3 text-muted">Address:</div>
                                        <div className="col-md-9">
                                            1 Argyle street, Prospect SA
                                        </div>
                                    </div>
                                    <h6 className="my-3">Goal</h6>
                                    <div className="row mb-2">
                                        <div className="col-md-3 text-muted">Weight:</div>
                                        <div className="col-md-9">
                                            50 kg
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-3 text-muted">Body Type:</div>
                                        <div className="col-md-9">
                                            Moderate
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return null;
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                                <p className="mb-0 fs-4">{capitalizeFirstLetter(userType)}</p>
                            </div>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="popup-overlay" style={{ padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="popup-content nav nav-pills user-profile-tab justify-content-center mt-0 rounded-2" style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)" }}>

                                <form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%', textAlign: 'center' }}>
                                    <button type="button" className="close-button" onClick={closeForm}>&times;</button>
                                    <h6 style={{ textAlign: 'center', marginBottom: '20px' }}>Request Diet</h6>
                                    <div style={{ paddingBottom: '20px' }}>
                                        Make a request
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
                <div style={{ paddingTop: '20px' }}>
                    {renderProfile()}
                </div>

            </section>
        </>
    );
}

export default ProfileId;



