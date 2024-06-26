import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaInfoCircle, FaUser } from "react-icons/fa";
import { DropdownButton, Dropdown, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUser = () => {
  const [userValues, setUserValues] = useState({
    Name: '',
    EmailAddress: '',
    userType: '',
    isActive: '',
    Password: '',
    profilePhoto: null,
  });

 const {id}=useParams();
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
    axios.get(`http://localhost:8081/readUser/${id}`)
      .then(res =>  {
        const userData = res.data[0];
        setUserValues({
            Name: userData.Name,
            EmailAddress: userData.EmailAddress,
            userType: userData.userType,
            isActive: userData.isActive,
            Password: userData.Password,
            profilePhoto: userData.profilePhoto,
            
        
    }) 
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to fetch user data. Please try again.');
      });
  }, [userId]);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  const handleFileChange = (e) => {
    setUserValues({ ...userValues, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', userValues.Name);
    formData.append('EmailAddress', userValues.EmailAddress);
    formData.append('userType', userValues.userType);
    formData.append('isActive', userValues.isActive);
    formData.append('Password', userValues.Password );
    if (userValues.profilePhoto) {
      formData.append('profilePhoto', userValues.profilePhoto);
    }

    axios.put(`http://localhost:8081/updateUser/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        setSuccess(true);
        setMessage(res.data.Message);
        navigate('/users');
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
          <Form.Group className="mb-3">
            <Form.Label>Account Activation</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="Active=1 Inactive=0"
                value={userValues.isActive}
                onChange={(e) => setUserValues({ ...userValues, isActive: e.target.value })}
                required
              />
              <div className="input-group-append">
                <span className="input-group-text"><FaEnvelope /></span>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
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
            {showDropdown && (
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
          </Form.Group>
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

export default EditUser;

