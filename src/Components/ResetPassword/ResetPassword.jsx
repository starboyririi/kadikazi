import React, { useState } from 'react';
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

  return (
    <div className={`wrapper`}>
      <div className='form-box Reset'>
        <Reset />
        <a href="http://localhost:3000/login">Remember your password?</a>
      </div>
    </div>
  );
};

function Reset()  {
  const [rsvalues, setRSValues] = useState({
    EmailAddress: '',
    Password: '',
    RepeatPassword: ''
  });
  const [action, setAction] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rsvalues.Password !== rsvalues.RepeatPassword) {
      alert('Passwords do not match');
      return;
    }

    axios
      .post('http://localhost:8081/reset-password', rsvalues)
      .then(res => {
        if (res.data.Status === "Success") {
          window.alert('Password reset successful', rsvalues);
          setAction(' reset'); // Set the action to 'reset' after successful submission
          navigate('/#'); // Redirect to login after successful password reset
        } else {
          alert('Error resetting password');
        }
      })
      .catch(err => console.log(err));
    console.log('Form submitted:', rsvalues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Password Reset</h1>
      <div className='input-box'>
        <input
          type="email"
          placeholder='Email'
          value={rsvalues.EmailAddress}
          onChange={(e) => setRSValues({ ...rsvalues, EmailAddress: e.target.value })}
          required
        />
        <FaEnvelope className='icon' />
      </div>
      <div className='input-box'>
        <input
          type="password"
          placeholder='Password'
          value={rsvalues.Password}
          onChange={(e) => setRSValues({ ...rsvalues, Password: e.target.value })}
          required
        />
        <FaLock className='icon' />
      </div>
      <div className='input-box'>
        <input
          type="password"
          placeholder='Repeat Password'
          required
          onChange={(e) => setRSValues({ ...rsvalues, RepeatPassword: e.target.value })}
        />
        <FaLock className='icon' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};


export default ResetPassword;