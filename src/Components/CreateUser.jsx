import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaInfoCircle, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { DropdownButton, Dropdown, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateUser = () => {
    return (
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
            <div className="bg-white p-4 rounded shadow-sm">
                <Registration />
                <div className='mt-3'>
                    <a href="#guidelines" onClick={() => document.getElementById('guidelines').scrollIntoView()}>
                        Password Guidelines
                    </a>
                    <ul id="guidelines" className="mt-2">
                        <li>8 or more characters long</li>
                        <li>Contain at least one uppercase letter</li>
                        <li>Contain at least one lowercase letter</li> 
                        <li>Contain at least one special character: @ # \ /</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Registration() {
    const [rvalues, setRValues] = useState({
        Name: '',
        EmailAddress: '',
        Password: '',
        RepeatPassword: '',
        userType: '',
        profilePhoto: null,  // Store the file here
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState);
    };

    const handleFileChange = (e) => {
        setRValues({ ...rvalues, profilePhoto: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (rvalues.Password.trim() !== rvalues.RepeatPassword.trim()) {
            setMessage('Passwords do not match');
            return;
        }

        // Check if password is at least eight characters long
        if (rvalues.Password.trim().length < 8) {
            setMessage('Password should be at least 8 characters');
            return;
        }

        const formData = new FormData();
        formData.append('Name', rvalues.Name);
        formData.append('EmailAddress', rvalues.EmailAddress);
        formData.append('Password', rvalues.Password);
        formData.append('userType', rvalues.userType);
        if (rvalues.profilePhoto) {
            formData.append('profilePhoto', rvalues.profilePhoto);
        }

        axios.post('http://localhost:8081/registerUser', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            if (res.data.Status === "Success") {
                setSuccess(true);
                setMessage('Registration successful! Please check your email to activate your account.');
                navigate('/');  // Redirect to the home page or login page
            } else {
                setMessage('Client not registered!');
            }
        })
        .catch(err => {
            console.error(err);
            setMessage('An error occurred. Please try again.');
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2 className='text-center mb-4'>Add User</h2>
            <Form.Group className="mb-3">
                <Form.Label>UserName</Form.Label>
                <div className="input-group">
                    <Form.Control
                        type="text"
                        placeholder="UserName"
                        value={rvalues.Name}
                        onChange={(e) => setRValues({ ...rvalues, Name: e.target.value })}
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
                        value={rvalues.EmailAddress}
                        onChange={(e) => setRValues({ ...rvalues, EmailAddress: e.target.value })}
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
                        placeholder="userType"
                        value={rvalues.userType}
                        onChange={(e) => setRValues({ ...rvalues, userType: e.target.value })}
                        required 
                    />
                    <div className="input-group-append">
                        <span className="input-group-text"><FaUser /></span>
                    </div>
                </div>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={rvalues.Password}
                        onChange={(e) => setRValues({ ...rvalues, Password: e.target.value })}
                        required
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
                        <Dropdown.Item>Contain at least one of the following special characters: @ # \ /</Dropdown.Item>
                    </DropdownButton>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Repeat Password</Form.Label>
                <div className="input-group">
                    <Form.Control
                        type="password"
                        placeholder="Repeat Password"
                        value={rvalues.RepeatPassword}
                        onChange={(e) => setRValues({ ...rvalues, RepeatPassword: e.target.value })}
                        required
                    />
                    <div className="input-group-append">
                        <span className="input-group-text"><FaLock /></span>
                    </div>
                </div>
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
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="I agree to the terms & conditions"
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Submit</Button>
            {message && <Alert variant={success ? 'success' : 'danger'} className="mt-3">{message}</Alert>}
        </Form>
    );
}

export default CreateUser;
