import React, { useState } from 'react';
import {auth} from './firebase';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const login = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            navigate("/");
        }).catch((e) => {
            if (
                e.message ===
                "The passoword is invalid or the user does not have a password."
            ) {
                alert("Please check your credentials again");
            } else if (
                e.message ===
                "There is no user record corresponding to this identifier. The user may have been deleted."
            ) {
                alert("Pleasee check your credentials again");
            } else {
                alert(e.message);
            }
        })
    }
    return (
        <div className='login'>
            <img src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg' className='login_logo' alt='' />
            <div className='login_container'>
                <h3>Log In to Facebook</h3>
                <form>
                    <input type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='Email Password' onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={login} type='submit' className='login_login'>Log in</button>
                    <div className='sideInfo'>
                        <h5>Forgotten Password?</h5>
                        <h5 className='dot'>.</h5>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <h5 className='rtd'>Sign up for Facebook</h5>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
