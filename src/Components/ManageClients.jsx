import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const ManageClients = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios.get('http://localhost:8081/getAllClients')
        .then(res => setData(res.data))
        .catch(err => setError(err.message));
    }, []);
  
    return (
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center '>
        <div className='w-100 bg-white rounded p-3'>
              <h2>Clients Page</h2>
              {error && <p className='text-danger'>{error}</p>}
              <div className='d-flex justify-content-end'>
                <Link to='/createClient' className='btn btn-success'>create +</Link>
              </div>
              <table className='table'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Gender</th>
                          <th>Address</th>
                          <th>RegistrationNo</th>
                          <th>Telephone</th>
                          <th>Primary Email Address</th>
                          <th>Secondary Email Address</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {data.map((client, index) => {
                      return <tr key={index}>
                          <td>{client.clientId}</td>
                          <td>{client.client_fName}</td>
                          <td>{client.client_lName}</td>
                          <td>{client.client_gender}</td>
                          <td>{client.client_pAddress}</td>
                          <td>{client.carRegistrationNo}</td>
                          <td>{client.client_telephoneNo}</td>
                          <td>{client.client_emailAddress}</td>
                          <td>{client.client_sEmailAddress}</td>
                          <td>
                            
                            <Link to={`/editClient/${client.clientId}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                            <button className='btn btn-sm btn-danger '>Delete</button>
                          </td>
                      </tr>
                    })}
                  </tbody>
              </table>
        </div>
      </div>
    );
}

export default ManageClients