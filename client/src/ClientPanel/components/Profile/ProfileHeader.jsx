import React, { useState } from 'react';
import './css/ProfilePage.css';
import Img1 from '../../assets/img/bg/BG.jpg';
import './css/ProfileEditForm.css';

const ProfileHeader = ({ firstName, userType, activeTab, onTabChange, loginUserType }) => {
    const [showPopup, setShowPopup] = useState(false);

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

    return (
        <>
            <section className="card-body p-0">
                <div className='cover-pic'>
                    <img src={Img1} alt="" className="img-fluid" />
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-4 order-lg-1 order-2">
                        <div className="d-flex align-items-center justify-content-around m-4">
                            <div className="text-center">
                                <h4 className="mb-0 fw-semibold lh-1">3,586</h4>
                                <div className="d-flex align-items-center">
                                    <i className="fa fa-user fs-6 me-2"></i>
                                    <p className="mb-0 fs-4 ml-2">Friends</p>
                                </div>
                            </div>
                        </div>
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
                                <h5 className="fs-5 mb-0 fw-semibold">{firstName}</h5>
                                <p className="mb-0 fs-4">{userType}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 order-last text-center">
                        <button className="btn mx-4" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }} onClick={togglePopup}>Edit Profile</button>
                    </div>
                </div>
            </section>
            <div style={{ padding: '20px 40%' }}>
                <ul className="nav nav-pills user-profile-tab justify-content-center mt-0 rounded-2" id="pills-tab" role="tablist" style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)" }}>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6 border-0 ${activeTab === "profile" ? "active" : ""}`}
                            id="pills-profile-tab"
                            onClick={() => onTabChange("profile")}
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected={activeTab === "profile"}
                            style={activeTab === "profile" ? { color: '#F5593D' } : null}
                        >
                            <i className="fa fa-user me-2 fs-6"></i>
                            <span className="d-none d-md-block ml-2">Profile</span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6 border-0 ${activeTab === "friends" ? "active" : ""}`}
                            id="pills-friends-tab"
                            onClick={() => onTabChange("friends")}
                            type="button"
                            role="tab"
                            aria-controls="pills-friends"
                            aria-selected={activeTab === "friends"}
                            tabIndex="-1"
                            style={activeTab === "friends" ? { color: '#F5593D' } : null}
                        >
                            <i className="fa fa-users me-2 fs-6"></i>
                            <span className="d-none d-md-block ml-2">Friends</span>
                        </button>
                    </li>
                </ul>
            </div>
            {showPopup && (
                <div className="popup-overlay" style={{ padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="popup-content nav nav-pills user-profile-tab justify-content-center mt-0 rounded-2" style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)" }}>
                        <form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%', textAlign: 'center' }}>
                            <button type="button" className="close-button" onClick={closeForm}>&times;</button>
                            <div className="form-group">
                                <label htmlFor="firstName">Firstname:</label>
                                <input type="text" id="firstName" className="form-control" autoComplete="given-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Lastname:</label>
                                <input type="text" id="lastName" className="form-control" autoComplete="family-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profileImage">Profile Image:</label>
                                <input type="file" id="profileImage" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="currentHeight">Current Height:</label>
                                <input type="text" id="currentHeight" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="currentWeight">Current Weight:</label>
                                <input type="text" id="currentWeight" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sex">Sex:</label>
                                <select id="sex" className="form-select">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bodyType">Body Type:</label>
                                <select id="bodyType" className="form-select">
                                    <option value="thin">Thin</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="fat">Fat</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="goalWeight">Goal Weight:</label>
                                <input type="text" id="goalWeight" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="goalBodyType">Goal Body Type:</label>
                                <select id="goalBodyType" className="form-select">
                                    <option value="fit">Fit</option>
                                    <option value="bulk">Bulk</option>
                                </select>
                            </div>
                            <button type="submit" className="btn" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }}>Edit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileHeader;
