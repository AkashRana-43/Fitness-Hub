import React, { useState } from 'react';
import FlexBetween from './FlexBetween';
import bg from '../assets/BG.jpg';
import './styles/Form.css';
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';



const Form = () => {
    //password visibility
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //useState 
    const [loginFormInput, setLoginFormInput] = useState({
        email: '',
        password: '',
    });

    const [joinUsFormInput, setJoinUsFormInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        user_type: '',
    });

    const [loginFormFocus, setLoginFormFocus] = useState({
        errEmail: '',
        errPassword: '',
    });

    const [joinUsFormFocus, setJoinUsFormFocus] = useState({
        errfirst_name: '',
        errlast_name: '',
        errEmail: '',
        errPassword: '',
        errConfirmPassword: '',
    });

    const navigate = useNavigate();

    const handleLoginFormChange = (e) => {
        const { name, value } = e.target;
        setLoginFormInput({ ...loginFormInput, [name]: value });
        if (value !== '') {
            setLoginFormFocus({ ...loginFormFocus, [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: false });
        }
    }

    const handleJoinUsFormChange = (e) => {
        const { name, value } = e.target;
        setJoinUsFormInput({ ...joinUsFormInput, [name]: value });
        if (value !== '') {
            setJoinUsFormFocus({ ...joinUsFormFocus, [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: false });
        }
    }


    //toggleForm
    const [showLoginForm, setShowLoginForm] = useState(true);

    function toggleFormState() {
        setShowLoginForm(!showLoginForm);
        navigate(showLoginForm ? '/joinus' : '/login');
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', loginFormInput);
            // Handle response
            console.log(response.data);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleSubmitJoinUsForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', joinUsFormInput);
            console.log(response.data);

            setJoinUsFormInput({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirmPassword: '',
                user_type: ''
            });
        } catch (error) {
            console.error("Error registering:", error);
        }
    }

    return (
        <>
            <img src={bg} alt=''
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }} />
            <FlexBetween
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    zIndex: '20'
                }}
            >
                <FlexBetween
                    style={{
                        position: 'relative',
                        width: '350px',
                        height: '440px',
                        borderRadius: '15px',
                        backgroundColor: 'rgba(255, 255, 255, 0.105)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.196)',
                        boxShadow: '0 5px 25px rgba(225, 225, 225, 0.5)',
                        overflow: 'hidden',
                        flexDirection: 'column',
                    }}
                >

                    <FlexBetween className='button-box'>
                        <button id='btn' className={showLoginForm ? 'slide-left' : 'slide-right'}></button>
                        <button type='button' className={`toggle-btn`} onClick={() => toggleFormState()}>Login</button>
                        <button type='button' className={`toggle-btn`} onClick={() => toggleFormState()}>Join Us</button>
                    </FlexBetween>


                    {showLoginForm ? (
                        <form id='login' className='input-group' onSubmit={handleLoginSubmit}>
                            <div>
                                <div className='input-container'>
                                    <input name='email' type='email' pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" className='input-field' placeholder='Email' value={loginFormInput.email} onChange={handleLoginFormChange} onBlur={() => setLoginFormFocus({ ...loginFormFocus, errEmail: true })} focus={loginFormFocus.errEmail.toString()} required />
                                    <span className='err-meg'>Enter a valid Email ID</span>
                                </div>
                                <div>
                                    <input
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        className='input-field'
                                        placeholder='Password'
                                        value={loginFormInput.password}
                                        onChange={handleLoginFormChange}
                                        required
                                    />
                                    <span className='icon-eye' onClick={togglePasswordVisibility}>
                                        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                                    </span>
                                </div>

                            </div>

                            <input type='checkbox' className='check-box' />
                            <span>Remember Password</span>
                            <button type='submit' className='submit-btn' id='btn'>Log In</button>
                        </form>
                    ) : (
                        <form id='joinus' className='input-group' onSubmit={handleSubmitJoinUsForm}>
                            <div style={{ overflow: 'auto', maxHeight: '240px' }}>
                                <div>
                                    <input name='first_name' type='text' pattern='^[A-Za-z0-9].{2,16}' className='input-field' placeholder='first_name' value={joinUsFormInput.first_name} onChange={handleJoinUsFormChange} onBlur={() => setJoinUsFormFocus({ ...joinUsFormFocus, errfirst_name: true })} focus={joinUsFormFocus.errfirst_name.toString()} required />
                                    <span className='err-meg'>Should have 3-16 character!</span>
                                </div>
                                <div>
                                    <input name='last_name' type='text' pattern='^[A-Za-z0-9].{2,16}' className='input-field' placeholder='last_name' value={joinUsFormInput.last_name} onChange={handleJoinUsFormChange} onBlur={() => setJoinUsFormFocus({ ...joinUsFormFocus, errlast_name: true })} focus={joinUsFormFocus.errlast_name.toString()} required />
                                    <span className='err-meg'>Should have 3-16 character!</span>
                                </div>
                                <div>
                                    <input
                                        name="user_type"
                                        list="userTypes"
                                        className="input-field"
                                        placeholder="Select User Type"
                                        value={joinUsFormInput.user_type}
                                        onChange={handleJoinUsFormChange}
                                    />
                                    <datalist id="userTypes">
                                        <option value="trainer"/>
                                        <option value="client"/>
                                    </datalist>
                                </div>

                                <div>
                                    <input name='email' type='email' pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" className='input-field' placeholder='Email' value={joinUsFormInput.email} onChange={handleJoinUsFormChange} onBlur={() => setJoinUsFormFocus({ ...joinUsFormFocus, errEmail: true })} focus={joinUsFormFocus.errEmail.toString()} required />
                                    <span className='err-meg'>Enter a valid Email ID</span>
                                </div>
                                <div className='input-container'>
                                    <input
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}"
                                        className='input-field'
                                        placeholder='Password'
                                        value={joinUsFormInput.password}
                                        onChange={handleJoinUsFormChange}
                                        onBlur={() => setJoinUsFormFocus({ ...joinUsFormFocus, errPassword: true })}
                                        focus={joinUsFormFocus.errPassword.toString()}
                                        required
                                    />
                                    <span className='icon-eye' onClick={togglePasswordVisibility}>
                                        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                                    </span>
                                    <span className='err-meg'>Password must have minimum 8 characters and include at least 1 uppercase, 1 number, 1 special character</span>
                                </div>

                                <div>
                                    <input name='confirmPassword' type='password' className='input-field' pattern={joinUsFormInput.password} placeholder='Confirm Password' value={joinUsFormInput.confirmPassword} onChange={handleJoinUsFormChange} onBlur={() => setJoinUsFormFocus({ ...joinUsFormFocus, errConfirmPassword: true })} focus={joinUsFormFocus.errConfirmPassword.toString()} required />
                                    <span className='err-meg'>Password is not matching!!</span>
                                </div>
                            </div>
                            <div>
                                <button type='submit' className='submit-btn' id='btn'>Join Us</button>
                            </div>

                        </form>

                    )}
                </FlexBetween>
            </FlexBetween>
        </>
    )
}

export default Form;
