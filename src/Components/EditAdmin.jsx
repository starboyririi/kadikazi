import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditAdmin = () => {
    const [adminValues, setAdminValues] = useState({
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
        axios.get(`http://localhost:8081/readAdmin/${id}`)
            .then(res => {
                const adminData = res.data[0];
                setAdminValues({
                    fName: adminData.fName,
                    lName: adminData.lName,
                    Address: adminData.Address,
                    Telephone: adminData.Telephone,
                    Gender: adminData.Gender,
                    EmailAddress: adminData.EmailAddress
                });
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to fetch admin details');
            });
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateAdmin/${id}`, adminValues)
            .then(res => {
                console.log(res);
                navigate('/manageAdmins');
            })
            .catch(err => {
                console.log(err);
                setMessage('Failed to update admin details');
            });
    };

    return (
        <div className="d-flex vh-100 w-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update Admin</h2>

                    <div className="mb-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setAdminValues({ ...adminValues, fName: e.target.value })}
                            value={adminValues.fName}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setAdminValues({ ...adminValues, lName: e.target.value })}
                            value={adminValues.lName}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Physical Address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setAdminValues({ ...adminValues, Address: e.target.value })}
                            value={adminValues.Address}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Telephone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setAdminValues({ ...adminValues, Telephone: e.target.value })}
                            value={adminValues.Telephone}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Gender</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setAdminValues({ ...adminValues, Gender: e.target.value })}
                            value={adminValues.Gender}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email Address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setAdminValues({ ...adminValues, EmailAddress: e.target.value })}
                            value={adminValues.EmailAddress}
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

export default EditAdmin;
