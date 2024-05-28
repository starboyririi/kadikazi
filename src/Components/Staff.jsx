
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Staff = () => {
    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                window.location.reload(true);
            })
            .catch(err => console.log(err));
    };
  return (
    <h1>Welcome Staff</h1>
  )
}

export default Staff