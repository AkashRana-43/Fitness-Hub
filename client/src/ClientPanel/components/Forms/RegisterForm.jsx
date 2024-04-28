import React, { useState } from 'react'
import './css/Register.css';

const RegisterForm = () => {
    //User type Selector 
    const [selectedOption, setSelectedOption] = useState('Trainer');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="background">
            <div className="wrapper">
                <form action="">
                    <h1>Join Us</h1>
                    <div className='input-row'>
                        <div className="input-box">
                            <input type="text" placeholder="Firstname" required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Lastname" required />
                            <i className='bx bxs-user'></i>
                        </div>
                    </div>
                    <div className='input-col'>
                        <div className="input-box">
                            <input type="email" placeholder="Email" required />
                            <i className='bx bxs-user'></i>
                        </div>

                        <div className="dropdown">
                            <button className="dropdown-btn" type="button">{selectedOption}</button>
                            <div className="dropdown-content">
                                <p onClick={() => handleOptionSelect('Trainer')}>Trainer</p>
                                <p onClick={() => handleOptionSelect('Client')}>Client</p>
                            </div>
                        </div>

                        <div className="input-box">
                            <input type="password" placeholder="Password" required />
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Re-type Password" required />
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div>
                            <button type="submit" class="btn">Join</button>
                        </div>
                        <div className='no-account'>
                            <p>Already have an account? <a href="/login">Login</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm