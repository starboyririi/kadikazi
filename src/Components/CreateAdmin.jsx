import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
const Create = () => {
    const [adminValues, setAdminvalues] = useState({
        fName: '',
        lName: '',
        Address: '',
        Telephone:'',
        Gender:'',
        EmailAddress:''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        // Check if email already exists
        axios.post('http://localhost:8081/check-adminEmail', { EmailAddress: adminValues.EmailAddress })
            .then(res => {
                if (res.data.exists) {
                    setMessage('Email already exists');
                } else {
                  //   Proceed with registration
                    axios.post('http://localhost:8081/registerAdmin', adminValues)
                        .then(res => console.log(res),
                        setMessage('Admin added successfully'),
                          navigate('/manageAdmins') 
                        )
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
    <div className='d-flex vh-100 bg-primary justify-content-center align-items center'>
       <div className='w-200 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Admin</h2>

                <div class="mb-2">
                    <label>First Name</label>
                    <input type="text" className="adminInputbox" onChange={(e) => setAdminvalues({ ...adminValues, fName: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Last Name</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setAdminvalues({ ...adminValues, lName: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Physical Address</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setAdminvalues({ ...adminValues, Address: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Telephone Number</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setAdminvalues({ ...adminValues, Telephone: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Gender</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setAdminvalues({ ...adminValues, Gender: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Email Address</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setAdminvalues({ ...adminValues, EmailAddress: e.target.value })} class="form-control"/>
                </div>

                {message && <div className="mb-2 alert alert-info">{message}</div>}
                
                <div class="mb-3">
                    <button type="submit"  class="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create