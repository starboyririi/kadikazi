import React, { useState, useEffect } from 'react';
import { FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lockscreen.css';

const LockScreen = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setEmail(res.data.EmailAddress);
        } else {
          setMessage(res.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
        setMessage("An error occurred while fetching data.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/lockscreen', { EmailAddress: email, Password: password });
      if (res.data.Status === "Success") {
        console.log('Successful Login');
        navigate(-1); // Redirect to the previous page
      } else {
        alert(res.data.Message);
        console.log(email);
      }
    } catch (err) {
      console.error('Error during lockscreen check:', err);
      alert('Error during lockscreen check. Please try again.');
      console.log(email);
    }
    console.log('Form submitted:', { EmailAddress: email, Password: password });
  };

  return (
    <div className='lockscreen'>
      <form onSubmit={handleSubmit}>
        <h1 className='myHeading'>LockScreen</h1>
        <div className='myInput-box'>
          <input
            type="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hidden
          />
        </div>
        <div className='myInput-box'>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='off'
          />
          <FaLock className='icon' />
        </div>
        <button className='myButton' type='submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LockScreen;
