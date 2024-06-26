import React, { useState } from 'react';
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="wrapper">
      <div className="form-box Reset">
        <Reset />
        <a href="/login">Remember your password?</a>
        <div className='Guidelines'>
          <div>
          <a>Password Guidelines</a>
          </div>
          
          <ul>
            <li>8 or more characters long</li>
            <li>Contain at least one uppercase letter</li>
            <li>Contain at least one lowercase letter</li>
            <li>Contain at least one special character: @ # \ /</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function Reset() {
  const [rsvalues, setRSValues] = useState({
    EmailAddress: '',
    Password: '',
    RepeatPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rsvalues.Password !== rsvalues.RepeatPassword) {
      setMessage('Passwords do not match');
      return;
    }

    axios.post('http://localhost:8081/reset-password', rsvalues)
      .then(res => {
        if (res.data.Status === "Success") {
          alert('Password reset successful');
          navigate('/login');
        } else {
          setMessage('Error resetting password');
        }
      })
      .catch(err => {
        console.log(err);
        setMessage('Error resetting password');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Password Reset</h1>
      <div className="input-box">
        <input
          type="email"
          placeholder="Email"
          value={rsvalues.EmailAddress}
          onChange={(e) => setRSValues({ ...rsvalues, EmailAddress: e.target.value })}
          required
        />
        <FaEnvelope className="icon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          placeholder="Password"
          value={rsvalues.Password}
          onChange={(e) => setRSValues({ ...rsvalues, Password: e.target.value })}
          required
        />
        <FaLock className="icon" />
      </div>
      <div className="input-box">
        <input
          type="password"
          placeholder="Repeat Password"
          value={rsvalues.RepeatPassword}
          onChange={(e) => setRSValues({ ...rsvalues, RepeatPassword: e.target.value })}
          required
        />
        <FaLock className="icon" />
      </div>
      
      <button type="submit">Submit</button>
      {message && <div className="error-message">{message}</div>}
    </form>
  );
}

export default ResetPassword;
