import React, { useState } from 'react';
import './css/ProfilePage.css';
import Img1 from '../../assets/img/bg/BG.jpg';
import './css/ProfileEditForm.css';

const ProfileHeader = ({ firstName, userType, activeTab, onTabChange, image }) => {

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [mealName, setMealName] = useState('');
    const [mealType, setMealType] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCaloreis] = useState('');
    const [protein, setProtein] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [fat, setFat] = useState('');
    const [fiber, setFiber] = useState('');


    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const userTypes = localStorage.getItem('user_type');

    const isTrainer = userTypes === 'trainer';

    const handleSubmitDiet = (event) => {
        event.preventDefault();
        const createDiet = {
            title: title,
            meal_name: mealName,
            meal_type: mealType,
            description: description,
            calories: calories,
            protein: protein,
            carbohydrates: carbohydrates,
            fat: fat,
            fiber: fiber
        };
        console.log(JSON.stringify(createDiet));
        if (!isTrainer) {
            console.error('Only trainers can create diet entries');
            return;
        }


        const sessionId = sessionStorage.getItem('session');
        console.log(sessionId);
        fetch('http://localhost:3001/diet/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'session': sessionId  // Replace with actual session ID
            },
            body: JSON.stringify(createDiet)

        })

            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Success:', data); // Log the response data
                alert('Data saved successfully!');
                handleClose();

            })
            .catch(err => console.log(err));

    };

    const renderButton = () => {
        if (userType === 'trainer') {
            return (
                <div className="col-lg-4 order-last text-center">
                    <button className="btn mx-4" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }} onClick={handleShow}>Create Diet</button>
                </div>
            );
        } else if (userType === 'normal') {
            return (
                <div className="col-lg-4 order-last text-center">
                    <button className="btn mx-4" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }} onClick={togglePopup}>Edit Profile</button>
                </div>
            );
        }
        return null;
    };

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        profile_image: null,
        current_height: '',
        current_weight: '',
        sex: 'male',
        body_type: 'thin',
        contact: '',
        address: '',
        goal_weight: '',
        goal_body_type: 'fit'
    });

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const closeForm = () => {
        setShowPopup(false);
    };

    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        togglePopup();

        const session = sessionStorage.getItem('session');
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await fetch('http://localhost:3001/profile', {
                method: 'PUT',
                headers: {
                    'session': session,
                },
                body: formDataToSend
            });

            if (response.ok) {
                console.log('Profile updated successfully');
                // Fetch updated user data and update state
                const updatedUserData = await response.json(); // Assuming the server returns the updated user data
                setFormData(updatedUserData); // Update state with the new data
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

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

                                        <img src={image} alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h5 className="fs-5 mb-0 fw-semibold">{firstName}</h5>
                                <p className="mb-0 fs-4">{capitalizeFirstLetter(userType)}</p>
                            </div>
                        </div>
                    </div>
                    {renderButton()}
                </div>
            </section>
            <div style={{ padding: '20px 40%' }}>
                <ul className="nav nav-pills user-profile-tab justify-content-center mt-0 rounded-2" id="pills-tab" role="tablist" style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)" }}>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6 border-0 ${activeTab === "profile" ? "active" : ""}`}
                            id="pills-profile-tab"
                            onClick={() => onTabChange("profile")}
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
                            onClick={() => onTabChange("friends")}
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

            {showPopup && (
                <div className="popup-overlay" style={{ padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="popup-content nav nav-pills user-profile-tab justify-content-center mt-0 rounded-2" style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)" }}>
                        <form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%', textAlign: 'center' }}>
                            <button type="button" className="close-button" onClick={closeForm}>&times;</button>
                            <div className="form-group">
                                <label htmlFor="first_name">Firstname:</label>
                                <input type="text" id="first_name" className="form-control" autoComplete="given-name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Lastname:</label>
                                <input type="text" id="last_name" className="form-control" autoComplete="family-name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile_image">Profile Image:</label>
                                <input type="file" id="profile_image" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="current_height">Current Height:</label>
                                <input type="text" id="current_height" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="current_weight">Current Weight:</label>
                                <input type="text" id="current_weight" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sex">Sex:</label>
                                <select id="sex" className="form-select" onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="body_type">Body Type:</label>
                                <select id="body_type" className="form-select" onChange={handleChange}>
                                    <option value="thin">Thin</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="fat">Fat</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact">Phone:</label>
                                <input type="text" id="contact" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="goal_weight">Goal Weight:</label>
                                <input type="text" id="goal_weight" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="goal_body_type">Goal Body Type:</label>
                                <select id="goal_body_type" className="form-select" onChange={handleChange}>
                                    <option value="fit">Fit</option>
                                    <option value="bulk">Bulk</option>
                                </select>
                            </div>
                            <button type="submit" className="btn" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }}>Edit</button>
                        </form>
                    </div>
                </div>
            )}

            {showModal && isTrainer && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Diet</h5>

                                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={handleSubmitDiet}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                        />
                                        <label className="form-label">Meal Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={mealName}
                                            onChange={(event) => setMealName(event.target.value)}
                                        />
                                        <label className="form-label">Meal Type</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={mealType}
                                            onChange={(event) => setMealType(event.target.value)}
                                        />
                                        <label className="form-label">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                        <label className="form-label">Calories</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={calories}
                                            onChange={(event) => setCaloreis(event.target.value)}
                                        />
                                        <label className="form-label">Protein</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={protein}
                                            onChange={(event) => setProtein(event.target.value)}
                                        />
                                        <label className="form-label">Carbs</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={carbohydrates}
                                            onChange={(event) => setCarbohydrates(event.target.value)}
                                        />
                                        <label className="form-label">Fat</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={fat}
                                            onChange={(event) => setFat(event.target.value)}
                                        />
                                        <label className="form-label">Fiber</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputText"
                                            value={fiber}
                                            onChange={(event) => setFiber(event.target.value)}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );



}

export default ProfileHeader;
