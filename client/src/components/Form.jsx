import React, { useState } from 'react';
import FlexBetween from './FlexBetween';
import bg from '../assets/BG.jpg';
import './styles/Form.css';
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Form = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const [formInput, setFormInput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [focus, setFocus] = useState({
        errFirstName: '',
        errLastName: '',
        errEmail: '',
        errPassword: '',
        errConfirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormInput({ ...formInput, [name]: value });
        if (value !== '') {
            setFocus({ ...focus, [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: false });
        }
    }

    const [showLoginForm, setShowLoginForm] = useState();
    const navigate = useNavigate();

    function toggleFormState() {
        setShowLoginForm(!showLoginForm);
        navigate(showLoginForm ? '/joinus' : '/login');
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
                        <form id='login' className='input-group'>
                            <div>
                                <div className='input-container'>
                                    <input name='email' type='email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className='input-field' placeholder='Email' value={formInput.email} onChange={handleChange} onBlur={() => setFocus({ ...focus, errEmail: true })} focus={focus.errEmail.toString()} required />
                                    <span className='err-meg'>Enter a valid Email ID</span>
                                </div>
                                <div>
                                    <input
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        className='input-field'
                                        placeholder='Password'
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
                        <form id='joinus' className='input-group' onSubmit={handleSubmit}>
                            <div style={{ overflow: 'auto', maxHeight: '240px' }}>
                                <div>
                                    <input name='firstname' type='text' pattern='^[A-Za-z0-9].{2,16}' className='input-field' placeholder='Firstname' value={formInput.firstname} onChange={handleChange} onBlur={() => setFocus({ ...focus, errFirstName: true })} focus={focus.errFirstName.toString()} required />
                                    <span className='err-meg'>Should have 3-16 character!</span>
                                </div>
                                <div>
                                    <input name='lastname' type='text' pattern='^[A-Za-z0-9].{2,16}' className='input-field' placeholder='Lastname' value={formInput.lastname} onChange={handleChange} onBlur={() => setFocus({ ...focus, errLastName: true })} focus={focus.errLastName.toString()} required />
                                    <span className='err-meg'>Should have 3-16 character!</span>
                                </div>
                                <div>
                                    <input name='email' type='email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className='input-field' placeholder='Email' value={formInput.email} onChange={handleChange} onBlur={() => setFocus({ ...focus, errEmail: true })} focus={focus.errEmail.toString()} required />
                                    <span className='err-meg'>Enter a valid Email ID</span>
                                </div>
                                <div className='input-container'>
                                    <input
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}"
                                        className='input-field'
                                        placeholder='Password'
                                        value={formInput.password}
                                        onChange={handleChange}
                                        onBlur={() => setFocus({ ...focus, errPassword: true })}
                                        focus={focus.errPassword.toString()}
                                        required
                                    />
                                    <span className='icon-eye' onClick={togglePasswordVisibility}>
                                        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                                    </span>
                                    <span className='err-meg'>Password must have minimum 8 characters and include at least 1 uppercase, 1 number, 1 special character</span>
                                </div>

                                <div>
                                    <input name='confirmPassword' type='password' className='input-field' pattern={formInput.password} placeholder='Confirm Password' value={formInput.confirmPassword} onChange={handleChange} onBlur={() => setFocus({ ...focus, errConfirmPassword: true })} focus={focus.errConfirmPassword.toString()} required />
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
