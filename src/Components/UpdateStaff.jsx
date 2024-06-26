import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateStaff = () => {
    const [staffValues, setStaffValues] = useState({
        fName: '',
        lName: '',
        Address: '',
        Telephone: '',
        Gender: '',
        Specialty: '',
        EmailAddress: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8081/readStaff/${id}`)
            .then(res => {
                const staffData = res.data[0];
                setStaffValues({
                    fName: staffData.fName,
                    lName: staffData.lName,
                    Address: staffData.Address,
                    Telephone: staffData.Telephone,
                    Gender: staffData.Gender,
                    Specialty: staffData.Specialty,
                    EmailAddress: staffData.EmailAddress
                });
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to fetch staff details');
            });
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateStaff/${id}`, staffValues)
            .then(res => {
                console.log(res);
                navigate('/manageStaff');
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to update staff details');
            });
    };

    return (
        <div className="d-flex vh-100 w-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update Staff</h2>

                    <div className="mb-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setStaffValues({ ...staffValues, fName: e.target.value })}
                            value={staffValues.fName}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setStaffValues({ ...staffValues, lName: e.target.value })}
                            value={staffValues.lName}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Physical Address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setStaffValues({ ...staffValues, Address: e.target.value })}
                            value={staffValues.Address}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Telephone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setStaffValues({ ...staffValues, Telephone: e.target.value })}
                            value={staffValues.Telephone}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Gender</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setStaffValues({ ...staffValues, Gender: e.target.value })}
                            value={staffValues.Gender}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Specialty</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setStaffValues({ ...staffValues, Specialty: e.target.value })}
                            value={staffValues.Specialty}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email Address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setStaffValues({ ...staffValues, EmailAddress: e.target.value })}
                            value={staffValues.EmailAddress}
                        />
                    </div>
                    {message && <div className="mb-2 alert alert-info">{message}</div>}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateStaff;
