import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Images/Logo.png';

import './homepage.css';



const Admin = () => {
  const navigate = useNavigate();
  const [userType, setRole] = useState();
  const [userId, setUserId] = useState();
  const [userValues, setUserValues] = useState();
  const [message, setMessage] = useState('');
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setRole=(res.data.userType);
          setUserId= (res.data.userId);
        } else {
          
        }
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:8081/readUser/${userId}`)
      .then(res =>  {
        const userData = res.data[0];
        setUserValues({
            Name: userData.Name,
            EmailAddress: userData.EmailAddress,
            Password: userData.Password,
            userType: userData.userType,
            profilePhoto: userData.profilePhoto,
            
        
    }) 
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to fetch user data. Please try again.');
      });
  }, [userId]);
  // const profilePic = userValues.profilePhoto;
  useEffect(() => {
    const handleBeforeUnload = () => {
      axios.get('http://localhost:8081/logout')
        .then(() => {
          
        })
        .catch(err => console.log(err));
    };

    const handlePopState = () => {
      axios.get('http://localhost:8081/logout')
        .then(() => {
          
          navigate('/login'); // Ensure redirect to login
        })
        .catch(err => console.log(err));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    let tim;
    const reload = () => {
      tim = setTimeout(() => {
        navigate('/lockscreen');
      }, 300000); // 5 minutes
    };

    const canceltimer = () => {
      clearTimeout(tim);
      reload();
    };

    reload();

    window.addEventListener('mousemove', canceltimer);
    window.addEventListener('click', canceltimer);

    return () => {
      clearTimeout(tim);
      window.removeEventListener('mousemove', canceltimer);
      window.removeEventListener('click', canceltimer);
    };
  }, [navigate]);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        
        navigate('/login'); // Redirect to login page after logout
      })
      .catch(err => console.log(err));
  };
  

  return (
    <div className='banner'>
      <div className="navbar">
        <img src={logo} alt="Logo" />
        <h2 style={{ color: 'aliceblue' }}>KADI KAZI</h2>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/lockscreen">Lockscreen</Link></li>
          <li><button className='button2' onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
      <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        {/* <li><img src={profilePic} alt="Profile Picture" className="profile-pic" /></li> */}
        <li><a href={`/editProfile`}>Edit Profile</a></li>
        <li><a href="/users">Manage Users</a></li>
        <li><a href="/manageClients">Manage Clients</a></li>
        <li><a href="/manageStaff">Manage Staff</a></li>
        <li><a href="/manageAdmins">Manage Admins</a></li>
        <li><a href="/register-car">Register Car</a></li>
        <li><a href="/view-payments">View Payments</a></li>
        <li><a href="/manage-bookings">Manage Bookings</a></li>
      </ul>
    </div>
      <h1>Welcome Admin</h1>
    </div>
  );
}

export default Admin;
