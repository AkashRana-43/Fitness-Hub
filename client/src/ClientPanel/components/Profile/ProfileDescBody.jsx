import React from 'react';

const ProfileDescBody = ({ userType }) => {
    // Define a function to render the rows based on user type
    const renderRows = () => {
        if (userType === 'normal') {
            return (
                <div className="row">
                    <div className="col">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h6 className="my-3">My Details</h6>
                                <div className="row mb-2">
                                    <div className="col-md-3 text-muted">Height:</div>
                                    <div className="col-md-9">
                                        167 cm
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-3 text-muted">Weight:</div>
                                    <div className="col-md-9">
                                        70 kg
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-3 text-muted">Sex:</div>
                                    <div className="col-md-9">
                                        Female
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-3 text-muted">Body Type:</div>
                                    <div className="col-md-9">
                                        Fat
                                    </div>
                                </div>
                                <h6 className="my-3">Contacts</h6>
                                <div className="row mb-2">
                                    <div className="col-md-3 text-muted">Phone:</div>
                                    <div className="col-md-9">
                                        +61 (04)45 678 910
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-3 text-muted">Address:</div>
                                    <div className="col-md-9">
                                        1 Argyle street, Prospect SA
                                    </div>
                                </div>
                                <h6 className="my-3">Goal</h6>
                                <div className="row mb-2">
                                    <div className="col-md-3 text-muted">Weight:</div>
                                    <div className="col-md-9">
                                        50 kg
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-3 text-muted">Body Type:</div>
                                    <div className="col-md-9">
                                        Moderate
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            {renderRows()}
        </section>
    );
};

export default ProfileDescBody;
