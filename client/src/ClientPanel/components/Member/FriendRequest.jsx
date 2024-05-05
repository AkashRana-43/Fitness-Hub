import React from 'react';
import './css/FriendReq.css';
import Img1 from '../../assets/img/bg/BG.jpg';

const FriendRequest = () => {
    // Array of hardcoded requesters
    const requesters = [
        {
            name: "Sophia",
            role: "Client",
            profilePic: Img1, 
            profileLink: '#' 
        },
        {
            name: "Rohit",
            role: "Client",
            profilePic: Img1,
            profileLink: '#' 
        },
    ];

    return (
        <>
            <section className='container'>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                        <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                            <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Friend Request <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">{requesters.length}</span></h3>
                            <form className="position-relative">
                                <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Friends" />
                                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className="row">
                    <div className="col-md-12"> 
                        <div className="people-nearby">
                            {requesters.map((requester, index) => (
                                <div key={index} className="nearby-user">
                                    <div className="row align-items-center"> 
                                        <div className="col-md-2 col-sm-2">
                                            <img src={requester.profilePic} alt="user" className="profile-photo-lg" />
                                        </div>
                                        <div className="col-md-2 col-sm-2"> 
                                            <h5 style={{marginBottom: 0}}><a href={requester.profileLink} className="profile-link" style={{ color: '#F5593D', fontWeight: 'bold' }}>{requester.name}</a></h5>
                                            <p style={{marginBottom: 0}}>{requester.role}</p> 
                                        </div>
                                        <div className="col-md-6 col-sm-6"></div>
                                        <div className="col-md-1 col-sm-1">
                                            <button className="btn btn-primary btn-sm">Accept</button> 
                                        </div>
                                        <div className="col-md-1 col-sm-1">
                                            <button className="btn btn-danger btn-sm">Reject</button> 
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendRequest;
