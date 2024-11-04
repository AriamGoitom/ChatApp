import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from './Components/Page';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import SideNav from './Components/SideNav';
import ProtectedRoute from './Components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
      <div className="App">
        <div className="d-flex">
          <div className="col-auto">
            <SideNav />
          </div>
          <div className="col">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<ProtectedRoute><Page /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    
  );
}

export default App;