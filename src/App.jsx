import { useState, useEffect } from 'react'
import React from 'react'
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Chat from './Components/Chat';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import SideNav from './Components/SideNav';
import './App.css'


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (forName) => {
    setCurrentForm(forName);
  }
  /* const [count, setCount] = useState(0) */

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App
