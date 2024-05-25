import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './css/Login.css';
import { useFetch } from 'ClientPanel/utils/FetchContext';

const LoginForm = ({handleLogin}) => {

    const navigate = useNavigate();
    const { updateUser } = useFetch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email,
                password
            });
           
            if (response.status === 200) {
                const { session, user_type } = response.data;
                
                sessionStorage.setItem('session', session);
                localStorage.setItem('user_type', user_type);
                
                updateUser(response.data);
                // console.log(response.data);
               
                if (user_type === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
                handleLogin(); 

            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="background">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="input-box">
                        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember Me</label>
                        <p className='forget-password'>Forget Password?</p>
                    </div>
                    <div>
                        <button className="btn">Login</button>
                    </div>
                    <div className='no-account'>
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
