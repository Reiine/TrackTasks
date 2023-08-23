import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Register({ handleLogSignRender }) {
    const navigation = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleName = (e) => {
        setName(e);
    }
    const handleEmail = (e) => {
        setEmail(e);
    }
    const handlePass = (e) => {
        setPass(e);
    }
    async function submit(e) {
        navigation('/login');

        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/register`, {
                name, email, pass
            })
            navigation('/login');
        } catch (error) {
            console.log("Failed to register:", error);
        }
    }
    return (
        <form className="form" onSubmit={submit}>
            <p>Sign Up</p>
            <label htmlFor="name">Name:</label><br />
            <input type="text" required onChange={(e) => handleName(e.target.value)} /><br />
            <label htmlFor="email">Email:</label><br />
            <input type="email" required onChange={(e) => handleEmail(e.target.value)} /><br />
            <label htmlFor="password">Password:</label><br />
            <input type="password" required onChange={(e) => handlePass(e.target.value)} /><br />
            <button type='submit' className='register-btn'>Sign Up</button><br />
            <a href='#' onClick={() => handleLogSignRender('login')}>Already have an account? Login.</a>
        </form>
    );
}

export default Register;
