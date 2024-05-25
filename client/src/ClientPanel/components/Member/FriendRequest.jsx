import React, { useState, useEffect } from 'react';
import './css/FriendReq.css';
import Img1 from '../../assets/img/bg/BG.jpg';
import axios from 'axios';

const FriendRequest = () => {
    const [requesters, setRequesters] = useState([]);

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const fetchFriendRequests = async () => {
        try {
            const session = sessionStorage.getItem('session');
            const response = await axios.get('http://localhost:3001/add_friend/requests/pending', {
                headers: {
                    'session': session,
                }
            });
            setRequesters(response.data);
            console.log('Requester:', response.data);

            // Store pending friend requests in local storage
            localStorage.setItem('pendingRequests', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        }
    };

    const handleDecision = async (requesterId, action) => {
        try {
            console.log(requesterId, action);
            const session = sessionStorage.getItem('session');
            const response = await axios.put('http://localhost:3001/add_friend/request/decision', {
                requesterId: requesterId,
                action: action,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'session': session,
                }
            });
            console.log(response.data.message);
            
            // Remove the requester from the state after a decision is made
            setRequesters((prevRequesters) => prevRequesters.filter(requester => requester.user_id !== requesterId));
            
            // Remove pending friend request from local storage
            const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests'));
            const updatedRequests = pendingRequests.filter(request => request.user_id !== requesterId);
            localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));
        } catch (error) {
            console.error('Error making decision:', error);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <>
            <section className='container'>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                        <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                            <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Friend Request <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">{requesters.length}</span></h3>
                            <form className="position-relative">
                                <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search" />
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
                                            <img src={requester.profilePic || Img1} alt="user" className="profile-photo-lg" />
                                        </div>
                                        <div className="col-md-2 col-sm-2">
                                            <h5 style={{ marginBottom: 0 }}>
                                                <a href={requester.profileLink || '#'} className="profile-link" style={{ color: '#F5593D', fontWeight: 'bold' }}>
                                                    {requester.first_name}
                                                </a>
                                            </h5>
                                            <p style={{ marginBottom: 0 }}>{capitalizeFirstLetter(requester.user_type)}</p>
                                        </div>
                                        <div className="col-md-6 col-sm-6"></div>
                                        <div className="col-md-1 col-sm-1">
                                            <button className="btn btn-primary btn-sm" onClick={() => handleDecision(requester.user_id, 'accept')}>Accept</button>
                                        </div>
                                        <div className="col-md-1 col-sm-1">
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDecision(requester.user_id, 'reject')}>Reject</button>
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
