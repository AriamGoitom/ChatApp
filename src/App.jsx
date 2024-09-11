import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Components/Chat';
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
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    
  );
}

export default App;


















/* import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Components/Chat';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import SideNav from './Components/SideNav';
import { AuthProvider } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ny state för inloggningsstatus

  return (
    <AuthProvider>
    <div className="App">
        <div className="d-flex">
          <div className="col-auto">
            <SideNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Skicka setIsLoggedIn till SideNav */
          /* </div>

          <div>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Skicka setIsLoggedIn till Login */
              /* <Route path="/chat" element={<Chat />} /> {/* Rutt för Chat */
              /* <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Standardrutt */
            /* </Routes>
          </div>
        </div>
    </div>
    </AuthProvider>
  );
}

export default App; */