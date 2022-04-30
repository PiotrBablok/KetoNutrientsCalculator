import React, { useState } from 'react'
/* CSS */
import './Login.css';

/* Hooks */
import { useAuth } from '../../Hooks/useAuth';

function Login() {

    const { login, register } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function emailHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function passwordHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function loginHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        login(email, password);

        setEmail('');
        setPassword('');
    }

    function registerHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        register(email, password);

        setEmail('');
        setPassword('');
    }

    return (
        <div className='loginModalHolder'>
            <form >
                <label >Email</label>
                <input type="text" onChange={emailHandler} />
                <label >Password</label>
                <input type="password" onChange={passwordHandler} />
                <button onClick={loginHandler}>Login</button>
                <button onClick={registerHandler}>Register</button>
            </form>
        </div>
    )
}

export default Login