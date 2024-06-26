import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
const Create = () => {
    const [staffValues, setStaffvalues] = useState({
        fName: '',
        lName: '',
        Address: '',
        Telephone:'',
        Gender:'',
        Specialty:'',
        EmailAddress:''
    });
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        // Check if email already exists
        axios.post('http://localhost:8081/check-staffEmail', { EmailAddress: staffValues.EmailAddress })
            .then(res => {
                if (res.data.exists) {
                    setMessage('Email already exists');
                } else {
                  //   Proceed with registration
                    axios.post('http://localhost:8081/registerStaff', staffValues)
                        .then(res => console.log(res)
                           
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
                <h2>Add Staff</h2>

                <div class="mb-2">
                    <label>First Name</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, fName: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Last Name</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, lName: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Physical Address</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, Address: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Telephone Number</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, Telephone: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Gender</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, Gender: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Specialty</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, Specialty: e.target.value })} class="form-control"/>
                </div>
                <div class="mb-3">
                <label>Email Address</label>
                    <input type="text" className="staffInputbox" onChange={(e) => setStaffvalues({ ...staffValues, EmailAddress: e.target.value })} class="form-control"/>
                </div>
                {message && <div className="mb-2 alert alert-info">{message}</div>}
                <div class="mb-3">
                    <button type="submit" name="updateStaff" class="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create