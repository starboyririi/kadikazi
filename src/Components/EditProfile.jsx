import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaInfoCircle, FaUser } from "react-icons/fa";
import { DropdownButton, Dropdown, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
  const [userValues, setUserValues] = useState({
    userId: '',
    Name: '',
    EmailAddress: '',
    IsActive: '',
    Password: '',
    RepeatPassword: '',
    userType: '',
    profilePhoto: null,
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [success, setSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setUserId(res.data.userId);
          
        } else {
          setMessage(res.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
        setMessage("An error occurred while fetching data.");
      });
  }, []);

  useEffect(() => {
    if (userId) {
      axios.post('http://localhost:8081/readProfile', { userId })
        .then(res => {
          const userData = res.data[0];
          setUserValues({
            userId: userData.userId,
            Name: userData.Name,
            EmailAddress: userData.EmailAddress,
            IsActive: userData.IsActive,
            userType: userData.userType,
            profilePhoto: userData.profilePhoto,
          });
        })
        .catch(err => {
          console.error(err);
          setMessage('Failed to fetch user data. Please try again.');
        });
    }
  }, [userId]);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  const handleFileChange = (e) => {
    setUserValues({ ...userValues, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userValues.Password !== userValues.RepeatPassword) {
      setMessage('Passwords do not match');
      setSuccess(false);
      return;
    }
    const formData = new FormData();
    formData.append('userId', userValues.userId);
    formData.append('Name', userValues.Name);
    formData.append('EmailAddress', userValues.EmailAddress);
    formData.append('IsActive', userValues.IsActive);
    formData.append('Password', userValues.Password);
    formData.append('userType', userValues.userType);
    if (userValues.profilePhoto) {
      formData.append('profilePhoto', userValues.profilePhoto);
    }

    axios.put('http://localhost:8081/updateProfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        setSuccess(true);
        setMessage(res.data.Message);
        window.alert('user updated successfully')
      })
      .catch(err => {
        console.error(err);
        setSuccess(false);
        setMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div className="d-flex vh-100 w-100 bg-primary justify-content-center align-items-center">
      <div className="w-100 bg-white rounded p-3">
        <Form onSubmit={handleSubmit}>
          <h2 className='text-center mb-4'>Update User</h2>
          
          <Form.Group className="mb-3">
            <div className="input-group">
              <Form.Control
                type="text"
                
                value={userValues.userId}
                onChange={(e) => setUserValues({ ...userValues, userId: e.target.value })}
               hidden
                
              />
            </div>
            
          </Form.Group>
          <Form.Group>
            <Form.Label>UserName</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="UserName"
                  value={userValues.Name}
                  onChange={(e) => setUserValues({ ...userValues, Name: e.target.value })}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text"><FaUser /></span>
                </div>
              </div>
            
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <div className="input-group">
              <Form.Control
                type="email"
                placeholder="Email"
                value={userValues.EmailAddress}
                onChange={(e) => setUserValues({ ...userValues, EmailAddress: e.target.value })}
                required
              />
              <div className="input-group-append">
                <span className="input-group-text"><FaEnvelope /></span>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>UserType</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="UserType"
                value={userValues.userType}
                onChange={(e) => setUserValues({ ...userValues, userType: e.target.value })}
                required
              />
              <div className="input-group-append">
                <span className="input-group-text"><FaUser /></span>
              </div>
            </div>
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setUserValues({ ...userValues, Password: e.target.value })}
              />
              <div className="input-group-append">
                <span className="input-group-text"><FaLock /></span>
              </div>
            </div>
            <Form.Label>Repeat Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type="password"
                placeholder="Repeat Password"
                onChange={(e) => setUserValues({ ...userValues, RepeatPassword: e.target.value })}
              />
              <div className="input-group-append">
                <span className="input-group-text"><FaLock /></span>
              </div>
            </div> */}
            {/* {showDropdown && (
              <DropdownButton
                id="dropdown-basic-button"
                title={<FaInfoCircle />}
                variant="info"
                className="mt-2"
              >
                <Dropdown.Item>Password guidelines:</Dropdown.Item>
                <Dropdown.Item>8 or more characters long</Dropdown.Item>
                <Dropdown.Item>Contain at least one uppercase letter</Dropdown.Item>
                <Dropdown.Item>Contain at least one lowercase letter</Dropdown.Item>
                <Dropdown.Item>Contain at least one of the following special characters: @ # / \</Dropdown.Item>
              </DropdownButton>
            )}
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Profile Photo</Form.Label>
            <div className="input-group">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Submit</Button>
          {message && <Alert variant={success ? 'success' : 'danger'} className="mt-3">{message}</Alert>}
        </Form>
      </div>
    </div>
  );
}

export default EditProfile;
