import React, { useState } from 'react'
/* CSS */
import './Register.css';

/* Hooks */
import { useAuth } from '../../Hooks/useAuth';

function Register() {

    const { register } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function emailHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function passwordHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function registerHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        register(email, password);

        setEmail('');
        setPassword('');
    }

    return (
        <div className='registerModalHolder'>
            <h1>Register</h1>
            <form >
                <label >Email</label>
                <input type="text" onChange={emailHandler} value={email} />
                <label >Password</label>
                <input type="password" onChange={passwordHandler} value={password} />
                <button onClick={registerHandler}>Login</button>
            </form>
        </div>
    )
}

export default Register;