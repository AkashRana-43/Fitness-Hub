import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Img1 from '../../assets/img/bg/BG.jpg';

const ProfileId = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user profile based on userId
        axios.get(`http://localhost:3001/profile/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
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
                                {/* Display user details */}
                                <h4 className="mb-0 fw-semibold lh-1">{user.friends_count}</h4>
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
                                {/* Display user name and type */}
                                <h5 className="fs-5 mb-0 fw-semibold">{user.first_name}</h5>
                                <p className="mb-0 fs-4">{user.user_type}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default ProfileId;
