import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AssignModal from './AssignModal';
import CheckCircle from '@mui/icons-material/CheckCircle';

const ProfileDescBody = ({ userType }) => {
    console.log(userType);
    const [profileData, setProfileData] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [requestDietData, setrequestDietData] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'requested_by', headerName: 'Requested By', width: 150 },
        { field: 'profile_name', headerName: 'Profile', width: 150 },
        { field: 'message', headerName: 'Message', width: 250 },
        {
            field: 'status', headerName: 'Status', width: 150,
            renderCell: (params) => (params.value ? <CheckCircle style={{ color: '#f5593d', fontSize: '25px' }} /> : 'Not assigned')
        },
        {
            field: 'actions',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                        setSelectedUserId(params.row.requested_by);
                        setShowAssignModal(true);
                    }}
                >
                    Assign
                </button>
            ),
        },
    ];

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        fetch('http://localhost:3001/profile', {
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
                setProfileData(data);
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    }, []);

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        fetch('http://localhost:3001/request/diets/', {
            method: 'GET',
            headers: {
                'session': session,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setrequestDietData(data);
                } else {
                    console.error('Received data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const updateStatus = (userId) => {
        setrequestDietData(prevData =>
            prevData.map(item =>
                item.id === userId ? { ...item, status: '✔️' } : item
            )
        );
    };

    const renderProfileDetails = () => {
        if (!profileData) {
            return <p>Loading...</p>;
        }

        if (userType === 'normal') {
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
        } else if (userType === 'trainer') {
            return (
                <div className="requestDietTable">
                    <DataGrid
                        rows={requestDietData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight
                        disableRowSelectionOnClick
                    />
                    {showAssignModal && (
                        <AssignModal
                            show={showAssignModal}
                            onHide={() => setShowAssignModal(false)}
                            userID={selectedUserId}
                            onStatusUpdate={updateStatus}
                        />
                    )}
                </div>
            );
        } else {
            return null;
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
