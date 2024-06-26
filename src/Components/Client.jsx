import React ,{ useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate,useParams } from 'react-router-dom';
import logo from './Images/Logo.png';
import { useAuth } from './AuthContext';
import './homepage.css';
import { useState } from 'react';
const Client = () => {
  

  const { auth, userType, Email, login, logout } = useAuth();
  const[Id, setId]= useState('')
  const navigate = useNavigate();
  useEffect(() => {
      axios.get('http://localhost:8081')
          .then(res => {
              if (res.data.Status === "Success") {
                  login(res.data.Email);
                  setId(res.data.userId)
              } else {
                  logout();
              }
          })
          .catch(err => console.log(err));
  }, [login, logout]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      axios.get('http://localhost:8081/logout')
        .then(() => {
          logout();
        })
        .catch(err => console.log(err));
    };

    const handlePopState = () => {
      axios.get('http://localhost:8081/logout')
        .then(() => {
          logout();
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
  }, [logout, navigate]);

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
              logout();
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
          <li><Link to="about.html">About</Link></li>
          <li><Link to="ContactUs.html">Contact Us</Link></li>
          <li><Link to="http://localhost:3000/Lockscreen">Lockscreen</Link></li>
          <li><Link to="http://localhost:3000/edit-user/:id">Edit User</Link></li>

          <li><button className='button' onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
      <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        {/* <li><img src={profilePic} alt="Profile Picture" className="profile-pic" /></li> */}
        <li><a href={`/editUser/${Id}`}>Edit Profile</a></li>
        <li><a href="/users">Manage Users</a></li>
        <li><a href="/manageClients">Manage Clients</a></li>
        <li><a href="/manageStaff">Manage Staff</a></li>
        <li><a href="/manageAdmins">Manage Admins</a></li>
        <li><a href="/register-car">Register Car</a></li>
        <li><a href="/view-payments">View Payments</a></li>
        <li><a href="/manage-bookings">Manage Bookings</a></li>
      </ul>
    </div>
      <h1>Welcome Client</h1>
    </div>
  );
}

export default Client;
