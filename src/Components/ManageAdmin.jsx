import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ManageAdmin = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/getAllAdmins')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deleteAdmin/${id}`)
        .then(() => {
          setData(prevData => prevData.filter(admin => admin.AdminId !== id));
      })
      .catch(err => {
          setError(err.message);
          console.log('Error deleting data:');
      });
};

    if (loading) {
        return <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 bg-white rounded p-3">
                <h2>Loading...</h2>
            </div>
        </div>;
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-100 bg-white rounded p-3'>
                <h2>Admin Page</h2>
                {error && <p className='text-danger'>{error}</p>}
                <div className='d-flex justify-content-end mb-3'>
                    <Link to='/createAdmin' className='btn btn-success'>Create +</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Telephone</th>
                            <th>Gender</th>
                            <th>Email Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((admin) => (
                            <tr key={admin.AdminId}>
                                <td>{admin.AdminId}</td>
                                <td>{admin.fName}</td>
                                <td>{admin.lName}</td>
                                <td>{admin.Address}</td>
                                <td>{admin.Telephone}</td>
                                <td>{admin.Gender}</td>
                                <td>{admin.EmailAddress}</td>
                                <td>
                                    <Link to={`/editAdmin/${admin.AdminId}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={() => handleDelete(admin.AdminId)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageAdmin;
