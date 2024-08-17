import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Components/Chat';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import SideNav from './Components/SideNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ny state för inloggningsstatus

  return (
    <div className="App">
        <div className="d-flex">
          <div className="col-auto">
            <SideNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Skicka setIsLoggedIn till SideNav */}
          </div>

          <div>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Skicka setIsLoggedIn till Login */}
              <Route path="/chat" element={<Chat />} /> {/* Rutt för Chat */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Standardrutt */}
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;