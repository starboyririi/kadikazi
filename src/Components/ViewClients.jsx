import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/getAllUsers')
      .then(res => setData(res.data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
            <h2>Users Page</h2>
            {error && <p className='text-danger'>{error}</p>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((users, index) => (
                    <tr key={index}>
                        <td>{users.userId}</td>
                        <td>{users.EmailAddress}</td>
                        <td>{users.userType}</td>
                        <td>
                        <button className='btn btn-sm btn-info'>Read</button>
                        <button className='btn btn-sm btn-primary  mx-2'>Edit</button>
                        <button className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
      </div>
    </div>
  );
}

export default Users;
