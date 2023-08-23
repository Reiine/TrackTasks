import React, { useEffect, useState } from 'react';
import Activities from './Activities';
import axios from 'axios';

function Dash() {
    const [trans, setTrans] = useState('');
    const [amount, setAmount] = useState();
    const [activity, setActivity] = useState('');
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [noOfTasks, setNoOfTasks] = useState(0)

    function submit(e) {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_DOMAIN_URL}/activitySubmit`, {
            trans, amount, activity
        })
        .then((res) => {
            setName(res.data.name);
            fetchUserActivities(); 
        })
        .catch((error) => {
            console.log("Failed to store activity", error);
        });
    }
    

    async function fetchUserName() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/getUserName`);
            const name = response.data.name;
            setName(name);
        } catch (error) {
            console.log('Error fetching user name:', error);
        }
    }

    async function fetchUserActivities() {
        try {
            const response = await fetch(`${process.env.REACT_APP_DOMAIN_URL}/userActivities`);
            const data = await response.json();
            setData(data);
        } catch (e) {
            console.log("Fetching failed", e);
        }
    }
    

    useEffect(() => {
        fetchUserName();
        fetchUserActivities();
    }, []);
    

    const handleClick = () => {
        fetchUserActivities();
    }

    function handleSelect(e) {
        setTrans(e);
    }

    const handleAmount = (e) => {
        setAmount(e);
    }

    const handleActivity = (e) => {
        setActivity(e);
    }

    useEffect(() => {
        const totalTasks = data.length;
        setNoOfTasks(totalTasks)
    }, [data]);

    async function handleDelete(activityId) {
        try {
            await axios.delete(`${process.env.REACT_APP_DOMAIN_URL}/deleteActivity/${activityId}`)
            fetchUserActivities();
        }
        catch (e) {
            console.log('failed to delete activity', e);
        }
    }
    return (
        <div className="dash-cover">
            <div className="userinfo">
                
                <div className="username">
                    <h2>{name}</h2>
                </div>
                <div className="balance">
                    <p>Tasks left:</p>
                    <h3>{noOfTasks}</h3>
                </div>
            </div>
            <form className="user-inputs" onSubmit={submit}>
                <select name="activity" id="deb-cred-drop" onChange={(e) => handleSelect(e.target.value)}>
                    <option value="select" selected>Select</option>
                    <option value="non-urgent">Non-urgent</option>
                    <option value="urgent">Urgent</option>
                </select>
                <input type="text" placeholder='Activity' onChange={(e) => handleActivity(e.target.value)} />
                <button type='submit' id='dash-btn' onClick={handleClick}>Go!</button>
            </form>
            {data.map((activity, index) => (
                <Activities activity={activity} key={index} onDelete={() => handleDelete(activity._id)} />
            ))}
        </div>
    );
}

export default Dash;
