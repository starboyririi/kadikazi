import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Client from './Client';
import Staff from './Staff';
import Admin from './Admin';
import './homepage.css';
import Footer from '../Footer';

function Home() {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/home')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setUserType(res.data.userType);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(() => {
                setAuth(false);
                setUserType('');
                navigate('/login');
            })
            .catch(err => console.log(err));
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        
  <Footer />
    );
}

export default Home;
