// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/Login';
import Register from './Components/LoginRegister/Register';
import Main from './Components/Main';
import Client from './Components/Client';
import Admin from './Components/Admin';
import Staff from './Components/Staff';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import PasswordGuidelines from './Components/LoginRegister/PasswordGuidelines';


function App() {
  return (
    <Router> 
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/client" element={<Client />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password" element={<PasswordGuidelines />} />
      </Routes>
    </Router>
  );
}

export default App;
