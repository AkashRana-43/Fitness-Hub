import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './css/Register.css';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState('trainer');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleOptionSelect = (option) => {
        setUserType(option === 'trainer' ? 'trainer' : 'normal');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateField = (name, value) => {
        const namePattern = /^[a-zA-Z]{3,}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;

        let fieldErrors = { ...errors };

        switch (name) {
            case 'first_name':
                if (value && !namePattern.test(value)) {
                    fieldErrors.first_name = 'At least 3 characters with no Symbol';
                } else {
                    delete fieldErrors.first_name;
                }
                break;
            case 'last_name':
                if (value && !namePattern.test(value)) {
                    fieldErrors.last_name = 'At least 3 characters with no Symbol';
                } else {
                    delete fieldErrors.last_name;
                }
                break;
            case 'email':
                if (value && !emailPattern.test(value)) {
                    fieldErrors.email = 'Email must be a valid';
                } else {
                    delete fieldErrors.email;
                }
                break;
            case 'password':
                if (value && !passwordPattern.test(value)) {
                    fieldErrors.password = 'At least 6 characters, contain one capital letter, one symbol, and one number';
                } else {
                    delete fieldErrors.password;
                }
                break;
            case 'confirmPassword':
                if (value && value !== formData.password) {
                    fieldErrors.confirmPassword = 'Password do not match';
                } else {
                    delete fieldErrors.confirmPassword;
                }
                break;
            default:
                break;
        }

        setErrors(fieldErrors);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateForm = () => {
        const validationErrors = {};
        const namePattern = /^[a-zA-Z]{3,}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;

        if (!namePattern.test(formData.first_name)) {
            validationErrors.first_name = 'At least 3 characters with no Symbol';
        }
        if (!namePattern.test(formData.last_name)) {
            validationErrors.last_name = 'At least 3 characters with no Symbol';
        }
        if (!emailPattern.test(formData.email)) {
            validationErrors.email = 'Email must be a valid';
        }
        if (!passwordPattern.test(formData.password)) {
            validationErrors.password = 'At least 6 characters, contain one capital letter, one symbol, and one number';
        }
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Password do not match';
        }
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
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
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const errorStyle = {
        color: 'red',
        fontSize: '0.875em',
        marginTop: '0.5em',
        textAlign: 'center',
        display: 'block'
    };

    return (
        <div className="background">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Join Us</h1>
                    <div className='input-row'>
                        <div className="input-box">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Firstname"
                                value={formData.first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <i className='bx bxs-user'></i>
                            {errors.first_name && <span style={errorStyle}>{errors.first_name}</span>}
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Lastname"
                                value={formData.last_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <i className='bx bxs-user'></i>
                            {errors.last_name && <span style={errorStyle}>{errors.last_name}</span>}
                        </div>
                    </div>
                    <div className='input-col'>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <i className='bx bxs-user'></i>
                            {errors.email && <span style={errorStyle}>{errors.email}</span>}
                        </div>
                        <div className="dropdown">
                            <button className="dropdown-btn" type="button">{userType === 'trainer' ? 'Trainer' : 'Normal'}</button>
                            <div className="dropdown-content">
                                <p onClick={() => handleOptionSelect('trainer')}>Trainer</p>
                                <p onClick={() => handleOptionSelect('normal')}>Normal</p>
                            </div>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <i className='bx bxs-lock-alt'></i>
                            {errors.password && <span style={errorStyle}>{errors.password}</span>}
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-type Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <i className='bx bxs-lock-alt'></i>
                            {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
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
