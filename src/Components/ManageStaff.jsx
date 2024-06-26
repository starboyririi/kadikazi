
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const ManageStaff = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios.get('http://localhost:8081/getAllStaff')
        .then(res => setData(res.data))
        .catch(err => setError(err.message));
    }, []);
  
    return (
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center '>
        <div className='w-100 bg-white rounded p-3'>
              <h2>Staff Page</h2>
              {error && <p className='text-danger'>{error}</p>}
              <div className='d-flex justify-content-end'>
                <Link to='/createStaff' className='btn btn-success'>create +</Link>
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
                          <th>Specialty</th>
                          <th>Email Address</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {data.map((staff, index) => {
                      return <tr key={index}>
                          <td>{staff.StaffId}</td>
                          <td>{staff.fName}</td>
                          <td>{staff.lName}</td>
                          <td>{staff.Address}</td>
                          <td>{staff.Telephone}</td>
                          <td>{staff.Gender}</td>
                          <td>{staff.Specialty}</td>
                          <td>{staff.EmailAddress}</td>
                          <td>
                            <button className='btn btn-sm btn-info'>Read</button>
                            <Link to={`/editStaff/${staff.StaffId}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                          </td>
                      </tr>
                    })}
                  </tbody>
              </table>
        </div>
      </div>
    );
}

export default ManageStaff