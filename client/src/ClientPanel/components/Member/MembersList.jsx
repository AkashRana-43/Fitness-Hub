import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Img1 from '../../assets/img/bg/BG.jpg';

const MemberList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        console.log("Session token:", session);
        axios.get('http://localhost:3001/profile/allusers', {
            method: 'GET',
            headers: {
                'session': session,
            }
        })
        .then(response => {
            console.log('Response data:', response.data);
            setUsers(response.data); // Update the users state with the fetched data
            setFilteredUsers(response.data); // Set filteredUsers initially with all users
        })
        .catch(error => {
            if (error.response.status === 403) {
                console.error('Forbidden access:', error.response.data);
                // Handle forbidden access error here, e.g., redirecting to login page or showing an error message
            } else {
                console.error('Error fetching users:', error);
            }
        });
    }, []);

    const filterUsers = (role) => {
        if (role === 'All') {
            setFilteredUsers(users); // If 'All' role selected, show all users
        } else {
            // Filter users based on selected role
            const filtered = users.filter(user => user.role.toLowerCase() === role.toLowerCase());
            setFilteredUsers(filtered);
        }
    };

    return (
        <section className='container'>
            <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                    <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Members <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">{filteredUsers.length}</span></h3>
                    <div className="userDropdown">
                        <select className="userDropdownicon" onChange={(e) => filterUsers(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Admin">Admin</option>
                            <option value="Moderator">Moderator</option>
                            {/* Add more role options here */}
                        </select>
                    </div>
                    <form className="position-relative">
                        <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search" />
                        <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                    </form>
                </div>
                <div className="row">
                    {filteredUsers && filteredUsers.map((user, index) => (
                        <div className="col-sm-6 col-lg-3" key={index} style={{ paddingTop: '40px' }}>
                            <div className="card hover-img" style={{ height: '100%', position: 'relative' }}>
                                <img src={Img1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="card-content">
                                    <div className="px-2 py-1 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                                        <h5 className="fw-semibold mb-0">{user.name}</h5>
                                    </div>
                                    <div className="px-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                                        <span className="text-dark fs-2">{user.role}</span>
                                    </div>
                                    <div className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center">
                                        {/* Your social links rendering */}
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
