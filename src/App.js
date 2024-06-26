import React from 'react';
import { AuthProvider } from './Components/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/Login';
import Register from './Components/LoginRegister/Register';
import Main from './Components/Main';
import Client from './Components/Client';
import Admin from './Components/Admin';
import EditUser from './Components/EditUser';
import ManageStaff from './Components/ManageStaff';
import ManageClients from './Components/ManageClients';
import ManageAdmin from './Components/ManageAdmin';
import Staff from './Components/Staff';
import Users from './Components/Users';
import CreateAdmin from './Components/CreateAdmin';
import CreateStaff from './Components/CreateStaff';
import CreateClient from './Components/CreateClient';
import CreateUser from './Components/CreateUser';
import UpdateStaff from './Components/UpdateStaff';
import EditAdmin from './Components/EditAdmin';
import EditClient from './Components/EditClient';
import EditProfile from './Components/EditProfile';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import PasswordGuidelines from './Components/LoginRegister/PasswordGuidelines';
import LockScreen from './Components/LoginRegister/Lockscreen';
import Activation from './Components/LoginRegister/Activation';

function App() {
  return (
    <AuthProvider>
      <Router> 
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/client" element={<Client />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate" element={<Activation />} />
          <Route path="/lockscreen" element={<LockScreen />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password" element={<PasswordGuidelines />} />
          <Route path="/users" element={<Users />} />
          <Route path="/manageStaff" element={<ManageStaff />} />
          <Route path="/manageClients" element={<ManageClients />} />
          <Route path="/manageAdmins" element={<ManageAdmin />} />
          <Route path="/createAdmin" element={<CreateAdmin />} />
          <Route path="/createClient" element={<CreateClient />} />
          <Route path="/createStaff" element={<CreateStaff />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/editUser/:id" element={<EditUser />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/editStaff/:id" element={<UpdateStaff />} />
          <Route path="/editAdmin/:id" element={<EditAdmin />} />
          <Route path="/editClient/:id" element={<EditClient />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
