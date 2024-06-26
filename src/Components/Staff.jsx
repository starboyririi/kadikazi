
import React ,{ useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Images/Logo.png';
import { useAuth } from './AuthContext';
import './homepage.css';
const Staff = () => {
  

  const { auth, userType, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      axios.get('http://localhost:8081')
          .then(res => {
              if (res.data.Status === "Success") {
                  login(res.data.User_Type);
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
          <li><button className='button' onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
      <h1>Welcome Staff</h1>
    </div>
  );
}

export default Staff;