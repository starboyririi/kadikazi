import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Client from './Client';
import Staff from './Staff';
import Admin from './Admin';
import './homepage.css';
import logo from './Images/Logo.png';

function Main() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [userType, setRole] = useState('');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setRole(res.data.User_Type);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                window.location.reload(true);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='container mt-4'>
            {
                auth ?
                    <div>
                        <h3>Welcome</h3>
                        {userType === "Admin" && <Admin />}
                        {userType === "Client" && <Client />}
                        {userType === "Staff" && <Staff />}
                        <button className='button' onClick={handleDelete}>Logout</button>
                    </div>
                    :
                    <div className="banner">
                        <div className="navbar">
                            <img src={logo} alt="Logo" />
                            <h2 style={{ color: 'aliceblue' }}>KADI KAZI</h2>
                            <ul>
                                <li><a href="about.html">About</a></li>
                                <li><a href="ContactUs.html">Contact Us</a></li>
                                <li><a href="http://localhost:3000/Lockscreen">Lockscreen</a></li>
                               <li><a href="http://localhost:3000/login">SignIn</a></li> 
                            </ul>
                        </div>
                        <div className="content">
                            <h1>KARIBU</h1>
                            <p>OUR PRIORITY IS CUSTOMER SATISFACTION</p>
                        </div>
                    </div>
            }
            
        </div>
    );
}

export default Main;
