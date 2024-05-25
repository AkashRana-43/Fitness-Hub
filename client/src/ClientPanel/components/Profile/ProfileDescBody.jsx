import React, { useEffect, useState } from 'react';

const ProfileDescBody = ({ userType }) => {
    const [profileData, setProfileData] = useState(null); // State to store profile data

    useEffect(() => {
        // Fetch profile data from the API
        const session = sessionStorage.getItem('session');
        fetch('http://localhost:3001/profile',{
            method: 'GET',
                headers: {
                    'session': session,
                },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                return response.json();
            })
            .then(data => {
                setProfileData(data); // Update profile data state with fetched data
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once after the component mounts

    // Define a function to render the profile details
    const renderProfileDetails = () => {
        if (!profileData) {
            return <p>Loading...</p>; // Show loading message while fetching data
        }

        if (userType === 'normal'){
            return (
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className="my-3">My Details</h6>
                        <div className="row mb-2">
                            <div className="col-md-3 text-muted">Height:</div>
                            <div className="col-md-9">
                                {profileData.current_height} cm
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-3 text-muted">Weight:</div>
                            <div className="col-md-9">
                                {profileData.current_weight} kg
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-3 text-muted">Sex:</div>
                            <div className="col-md-9">
                                {profileData.sex}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-3 text-muted">Body Type:</div>
                            <div className="col-md-9">
                                {profileData.body_type}
                            </div>
                        </div>
                        <h6 className="my-3">Contacts</h6>
                        <div className="row mb-2">
                            <div className="col-md-3 text-muted">Phone:</div>
                            <div className="col-md-9">
                                {profileData.contact}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-3 text-muted">Address:</div>
                            <div className="col-md-9">
                                {profileData.address}
                            </div>
                        </div>
                        <h6 className="my-3">Goal</h6>
                        <div className="row mb-2">
                            <div className="col-md-3 text-muted">Goal Weight:</div>
                            <div className="col-md-9">
                                {profileData.goal_weight} kg
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-3 text-muted">Goal Body Type:</div>
                            <div className="col-md-9">
                                {profileData.goal_body_type}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    };

    return (
        <section className='container'>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                    <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                        <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Profile <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">20</span></h3>
                    </div>
                </div>
            </div>
            {renderProfileDetails()}
        </section>
    );
};

export default ProfileDescBody;
