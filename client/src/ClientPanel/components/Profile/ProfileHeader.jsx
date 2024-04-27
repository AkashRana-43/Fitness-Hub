import React, { useState } from 'react';
import './css/ProfilePage.css';
import Img1 from '../../assets/img/bg/BG.jpg';

const ProfileHeader = () => {

    const [activeTab, setActiveTab] = useState("profile");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

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
                                <h5 className="fs-5 mb-0 fw-semibold">Mathew Anderson</h5>
                                <p className="mb-0 fs-4">Designer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 order-last text-center">
                        <button className="btn mx-4" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }}>Add Friend</button>
                    </div>
                </div>
            </section>
            <div style={{ padding: '0 40%' }}>
                <ul className="nav nav-pills user-profile-tab justify-content-center mt-0 rounded-2" id="pills-tab" role="tablist" style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)" }}>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6 border-0 ${activeTab === "profile" ? "active" : ""}`}
                            id="pills-profile-tab"
                            onClick={() => handleTabClick("profile")}
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
                            onClick={() => handleTabClick("friends")}
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
        </>
    );
}

export default ProfileHeader;
