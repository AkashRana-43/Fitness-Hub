import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './css/Register.css';

const RegisterForm = () => {

    const navigate = useNavigate();

    const [userType, setUserType] = useState('Trainer');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const handleOptionSelect = (option) => {
        // setUserType(option);
        setUserType(option === 'trainer' ? 'trainer' : 'normal');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    user_type: userType 
                })
            });
            const data = await response.json();
            console.log('Registration successful:', data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
        navigate('/login');
    };

    return (
        <div className="background">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Join Us</h1>
                    <div className='input-row'>
                        <div className="input-box">
                            <input type="text" name="first_name" placeholder="Firstname" value={formData.first_name} onChange={handleChange} required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input type="text" name="last_name" placeholder="Lastname" value={formData.last_name} onChange={handleChange} required />
                            <i className='bx bxs-user'></i>
                        </div>
                    </div>
                    <div className='input-col'>
                        <div className="input-box">
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="dropdown">
                            <button className="dropdown-btn" type="button">{userType === 'trainer' ? 'Trainer' : 'Client'}</button>
                            <div className="dropdown-content">
                                <p onClick={() => handleOptionSelect('trainer')}>Trainer</p>
                                <p onClick={() => handleOptionSelect('normal')}>Client</p>
                            </div>
                        </div>
                        <div className="input-box">
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Re-type Password" required />
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div>
                            <button type="submit" className="btn">Join</button>
                        </div>
                        <div className='no-account'>
                            <p>Already have an account? <a href="/login">Login</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
