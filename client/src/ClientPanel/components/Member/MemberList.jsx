import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Img1 from '../../assets/img/bg/BG.jpg';
import { FaUserPlus, FaCheck } from 'react-icons/fa';

const MemberList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userType, setUserType] = useState('All');
    const [addedFriends, setAddedFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        axios.get('http://localhost:3001/profile/allusers', {
            headers: {
                'session': session,
            }
        })
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

        // Retrieve addedFriends and pendingRequests from localStorage
        // const storedAddedFriends = localStorage.getItem('addedFriends');
        const storedPendingRequests = localStorage.getItem('pendingRequests');
        // if (storedAddedFriends) {
        //     setAddedFriends(JSON.parse(storedAddedFriends));
        // }
        if (storedPendingRequests) {
            setPendingRequests(JSON.parse(storedPendingRequests));
        }
    }, []);

    useEffect(() => {
        if (userType === 'All') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user => user.role === userType);
            setFilteredUsers(filtered);
        }
    }, [userType, users]);

    const toggleFriendStatus = async (recipientId) => {
        try {
            const session = sessionStorage.getItem('session');
            if (pendingRequests.includes(recipientId)) {
                console.log('Friend request is already pending for user:', recipientId);
                return;
            }
            const response = await axios.post(
                'http://localhost:3001/add_friend/request',
                { recipientId: Number(recipientId) },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'session': session,
                    },
                }
            );
            console.log('Friend request sent successfully:', response.data);
            if (response.data.status === 'pending') {
                setAddedFriends([...addedFriends, { recipientId: recipientId }]);
                setPendingRequests([...pendingRequests, recipientId]);
                // Store addedFriends and pendingRequests in localStorage
                // localStorage.setItem('addedFriends', JSON.stringify([...addedFriends, { recipientId: recipientId }]));
                localStorage.setItem('pendingRequests', JSON.stringify([...pendingRequests, recipientId]));
            } else {
                console.log('Unexpected response status:', response.data.status);
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    return (
        <section className='container'>
            <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                    <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Members <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">{filteredUsers.length}</span></h3>
                    <div className="userDropdown">
                        <select className="userDropdownicon" value={userType} onChange={(e) => setUserType(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Trainer">Trainer</option>
                            <option value="Client">Client</option>
                        </select>
                    </div>
                    <form className="position-relative">
                        <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search" />
                        <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                    </form>
                </div>
                <div className="row">
                    {filteredUsers.map((user, index) => (
                        <div className="col-sm-6 col-lg-3" key={index} style={{ paddingTop: '40px' }}>
                            <div className="card hover-img" style={{ height: '100%', position: 'relative' }}>
                                <img src={Img1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="card-content">
                                    <div className="px-2 py-1 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                                        <h5 className="fw-semibold mb-0">{user.first_name}</h5>
                                        {/* Add friend icon */}
                                        <div onClick={() => toggleFriendStatus(user.user_id)} style={{ cursor: 'pointer', position: 'absolute', top: '5px', right: '8px', color: (addedFriends.some(friend => friend.recipientId === user.user_id) || pendingRequests.includes(user.user_id)) ? '#F5593D' : 'white' }}>
                                            {(addedFriends.some(friend => friend.recipientId === user.user_id) || pendingRequests.includes(user.user_id)) ? <FaCheck /> : <FaUserPlus />}
                                        </div>
                                    </div>
                                    <div className="px-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                                        <span className="text-dark fs-2">{user.role}</span>
                                    </div>
                                    <div className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center">
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item me-3">
                                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                                    <i className="fa fa-facebook-square"></i>
                                                </a>
                                            </li>
                                            <li className="list-inline-item me-3">
                                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                                    <i className="fa fa-instagram"></i>
                                                </a>
                                            </li>
                                            <li className="list-inline-item me-3">
                                                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li className="list-inline-item me-3">
                                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                                    <i className="fa fa-linkedin-square"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MemberList;
