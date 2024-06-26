import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const CreateClient = () => {
    const [clientValues, setClientValues] = useState({
        fName: '',
        lName: '',
        Gender: '',
        Address: '',
        CarRegistrationNo: '',
        Telephone: '',
        EmailAddress: '',
        SemailAddress: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if email already exists
        axios.post('http://localhost:8081/check-clientEmail', { EmailAddress: clientValues.EmailAddress })
            .then(res => {
                if (res.data.exists) {
                    setMessage('Email already exists');
                } else {
                    // Proceed with registration
                    axios.post('http://localhost:8081/registerClient', clientValues)
                        .then(res => {
                            console.log(res);
                            setMessage('Client registered successfully');
                            // navigate('/success'); // Navigate to a success page or another route
                        })
                        .catch(err => {
                            console.error(err);
                            setMessage('An error occurred. Please try again.');
                        });
                }
            })
            .catch(err => {
                console.error(err);
                setMessage('An error occurred. Please try again.');
            });
    };
    
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className=' bg-white rounded p-3' style={{ width: '500%' }}>
                <form onSubmit={handleSubmit}>
                    <h2>Add Client</h2>

                    <div className="mb-2">
                        <label>First Name</label>
                        <input type="text" onChange={(e) => setClientValues({ ...clientValues, fName: e.target.value })} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label>Last Name</label>
                        <input type="text" onChange={(e) => setClientValues({ ...clientValues, lName: e.target.value })} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label>Gender</label>
                        <input type="text" onChange={(e) => setClientValues({ ...clientValues, Gender: e.target.value })} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label>Address</label>
                        <input type="text" onChange={(e) => setClientValues({ ...clientValues, Address: e.target.value })} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label>Car Registration No</label>
                        <input type="text" onChange={(e) => setClientValues({ ...clientValues, CarRegistrationNo: e.target.value })} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label>Telephone</label>
                        <input type="text" onChange={(e) => setClientValues({ ...clientValues, Telephone: e.target.value })} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label>Email Address</label>
                        <input type="text" onChange={(e) => setClientValues({ ...clientValues, EmailAddress: e.target.value })} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label>Secondary Email Address</label>
                        <input type="text" onChange={(e) => setClientValues({ ...clientValues, SemailAddress: e.target.value })} className="form-control" />
                    </div>
                    
                    {message && <div className="mb-2 alert alert-info">{message}</div>}
                    
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateClient;
