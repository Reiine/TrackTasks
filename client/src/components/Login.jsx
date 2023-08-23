import React, { useState } from 'react';
import axios from 'axios';

function Login({ handleLogSignRender , handleDash }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const handleEmail = (e) => {
        setEmail(e);
    }
    const handlePass = (e) => {
        setPass(e);
    }
    async function submit(e) {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/login`, {
                email, pass
            }).then((res)=>{
                if(res.data.message === 'logsuccess'){
                    handleDash(true)
                }
            })
            
        }
        catch(e){
            console.log('ERROR: ', e);
        }
    }
    return (
        <form className="form" action='POST' onSubmit={submit}>
            <p>Login</p>
            <label htmlFor="email">Email:</label><br />
            <input type="email" required onChange={(e) => handleEmail(e.target.value)} /><br />
            <label htmlFor="password">Password:</label><br />
            <input type="password" required onChange={(e) => handlePass(e.target.value)} /><br />
            <button type='submit' className='register-btn'>Login</button><br />
            <a href='#' onClick={() => handleLogSignRender('register')}>Don't have an account? Sign Up.</a>
        </form>
    );
}

export default Login;