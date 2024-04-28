import React from 'react';
import './css/Login.css';

const LoginForm = () => {
    return (
        <div className="background">
            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required />
                            <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                            <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember Me</label>
                        <p className='forget-password'>Forget Password?</p>
                    </div>
                    <div>
                        <button type="submit" class="btn">Login</button>
                    </div>
                    <div className='no-account'>
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;
