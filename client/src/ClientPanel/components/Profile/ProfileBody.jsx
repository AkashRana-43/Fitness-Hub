import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Img1 from '../../assets/img/bg/BG.jpg';


const ProfileBody = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userType, setUserType] = useState('All');
    const navigate = useNavigate(); // Use useNavigate hook to get navigate function

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        axios.get('http://localhost:3001/add_friend/requests/accepted', {
            headers: {
                'session': session,
            }
        })
            .then(response => {
                console.log(response.data);
                const usersWithRoles = response.data.map(user => ({
                    ...user,
                    role: user.user_type.toLowerCase() // Ensure role is in lowercase
                }));
                setUsers(usersWithRoles);
                setFilteredUsers(usersWithRoles);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    useEffect(() => {
        if (userType === 'All') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user => user.role === userType.toLowerCase());
            setFilteredUsers(filtered);
        }
    }, [userType, users]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleCardClick = (userId) => {
        navigate(`/profile/${userId}`);
    };




    return (
        <section className='container'>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                    <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                        <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Friends <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">{filteredUsers.length}</span></h3>
                        <div className="userDropdown">
                            <select className="userDropdownicon" value={userType} onChange={(e) => setUserType(e.target.value)} style={{ backgroundColor: '#F5593D' }}>
                                <option value="All">All</option>
                                <option value="Trainer">Trainer</option>
                                <option value="normal">Normal</option>
                            </select>
                        </div>
                        <form className="position-relative">
                            <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search" />
                            <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                        </form>
                    </div>
                    <div className="row">
                        {filteredUsers.map((user) => {
                            const imagePath = user.profile_image ? require(`../../uploads/${user.profile_image}`) : Img1;
                            return (
                                <div className="col-sm-6 col-lg-3" key={user.user_id} style={{ paddingTop: '40px', paddingBottom: '40px', height: '25rem' }} onClick={() => handleCardClick(user.user_id)}>
                                    <div className="card hover-img" style={{ height: '100%', position: 'relative' }}>
                                        <img src={imagePath} alt="" style={{ width: '100%', height: '70%', objectFit: 'cover' }} />
                                        <div className="card-content">
                                            <div className="px-2 py-1 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                                                <h5 className="fw-semibold mb-0">{user.first_name}</h5>
                                            </div>
                                            <div className="px-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                                                <span className="text-dark fs-2">{capitalizeFirstLetter(user.role)}</span>
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
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileBody;
