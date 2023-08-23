import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

function Home({handleDash}) {
    const [logValue, onLogValue] = useState('register');
    const handleLogSignRender = (location) =>{
        onLogValue(location);
    }
    return ( 
        <div className="home-cover">
            <div className="left-home">
                <p>Track Your</p>
                <h1>Activities</h1>
                <p>Jotting your tasks made easy!</p>
            </div>
            <div className="right-home">
                {logValue==='register'? <Register handleLogSignRender = {handleLogSignRender}/> : <Login handleLogSignRender = {handleLogSignRender} handleDash = {handleDash}/>}
            </div>
        </div>
     );
}

export default Home;