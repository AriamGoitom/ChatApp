import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SideNav = () => {
  const navigate = useNavigate();
  
  const authData = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
  
    localStorage.removeItem('user');
   
    navigate('/login', { replace: true });
  };

  return (
    <div className="sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100">
      <div>
        <div className="d-flex align-items-center">
          <span className="fs-4">Sidenav</span>
        </div>
        <hr className="text-secondary mt-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          {!authData && (
            <>
              <li className="nav-item p-1">
                <Link to="/register" className="nav-link text-white">
                  <span className="fs-5">Register</span>
                </Link>
              </li>
              <li className="nav-item p-1">
                <Link to="/login" className="nav-link text-white">
                  <span className="fs-5">Login</span>
                </Link>
              </li>
            </>
          )}
          {authData && (
            <>
              <li className="nav-item p-1">
                <Link to="/profile" className="nav-link text-white">
                  <span className="fs-5">Profile</span>
                </Link>
              </li>
              <li className="nav-item p-1">
                <button onClick={handleLogout} className="nav-link text-white btn btn-link">
                  <span className="fs-5">Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;

