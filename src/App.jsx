import { useState, useEffect } from 'react'
import React from 'react'
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Chat from './Components/Chat';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import SideNav from './Components/SideNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (forName) => {
    setCurrentForm(forName);
  }
  /* const [count, setCount] = useState(0) */

  return (
    <div className="App">

      <div className="d-flex">

        <div className="col-auto">
          <SideNav />
        </div>

        <div>
          <Routes>
            {/* <Route path="/" element={<Dashboard  />}></Route> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} /> {/* Rutt för Chat */}
            <Route path="/" element={<Login />} /> {/* Standardrutt */}
          </Routes>
        </div>

      </div>

      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App


function Home() {
  return <h2>Home component</h2>
}

function Order() {
  return <h2>Order component</h2>
}