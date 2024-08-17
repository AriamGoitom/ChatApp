import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';

const SideNav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ta bort token från localStorage
    localStorage.removeItem('token');
    // Uppdatera inloggningsstatus
    setIsLoggedIn(false);
    // Omdirigera till inloggningssidan
    navigate('/login');
  };

  return (
    <div className='sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100'>
      <div>
        <a href="d-flex align-items-center">
          <i className='fs-5 me-2'></i>
          <span className='fs-4'>Sidenav</span>
        </a>
        <hr className='text-secondary mt-2'/>
        <ul className='nav nav-pills flex-column p-0 m-0'>
          <li className='nav-item p-1'>
            <Link to="/register" className='nav-link text-white'>
              <i className='me-2 fs-5'></i>
              <span className='fs-5'>Register 👼🏽</span>
            </Link>
          </li>
          <li className='nav-item p-1'>
            <Link to="/login" className='nav-link text-white'>
              <i className=' me-2 fs-5'></i>
              <span className='fs-5'>Login 🔐</span>
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className='nav-item p-1'>
                <Link to="/profile" className='nav-link text-white'>
                  <i className=' me-2 fs-5'></i>
                  <span className='fs-5'>Profile 👤</span>
                </Link>
              </li>
              <li className='nav-item p-1'>
                <button onClick={handleLogout} className='nav-link text-white btn btn-link'>
                  <i className='me-2 fs-5'></i>
                  <span className='fs-5'>Logout 🚪</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideNav;