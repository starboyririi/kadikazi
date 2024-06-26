import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Client from './Client';
import Admin from './Admin';
import Staff from './Staff';
import './homepage.css';
import logo from './Images/Logo.png';

function Main() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [Role, setRole] = useState('');
    const [userId, setUser] = useState('');
    const [name, setName] = useState('');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setRole(res.data.userType);
                    setUser(res.data.userId);
                    
                    
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
                setMessage("An error occurred while fetching data.");
            });
    }, []);

    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                window.location.reload(true);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="banner">
            {auth ? (
                <div>
                    
                    {/* <img src={logo} alt="Logo" />
                    <h2 style={{ color: 'aliceblue' }}>KADI KAZI</h2> */}
                    {Role === "admin" && <Admin />}
                    {Role === "client" && <Client />}
                    {Role === "staff" && <Staff />}
                    <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
                </div>
            )
                        :(
                        <div className="navbar">
                            <img src={logo} alt="Logo" />
                            {/* <h2 style={{ color: 'aliceblue' }}>KADI KAZI</h2> */}
                            <ul>
                                <li><a href="about.html">About</a></li>
                                <li><a href="ContactUs.html">Contact Us</a></li>
                                <li><a href="http://localhost:3000/Lockscreen">Lockscreen</a></li>
                                <li><a href="http://localhost:3000/login">Login</a></li>
                            </ul>
                        </div>
    )
                    }
                    </div>
          
        
    );
};


export default Main;
