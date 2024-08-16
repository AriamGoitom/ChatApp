import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'
import { HiMenu } from "react-icons/hi";

const SideNav = () => {
  return (
    <div className='sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100'>
      <div>
        <a href="d-flex align-items-center">
          <i className=' fs-5 me-2'></i>
          <span className='fs-4'>Sidenav</span>
        </a>
        <hr className='text-secondary mt-2'/>
        <ul className='nav nav-pills flex-column p-0 m-0'>
          <li className='nav-item p-1'>
            <Link to="Register" className='nav-link text-white'>
              <i className='me-2 fs-5'></i>
              <span className='fs-5'>Register 👼🏽</span>
            </Link>
          </li>
          <li className='nav-item p-1'>
            <Link to="Login" className='nav-link text-white'>
              <i className=' me-2 fs-5'></i>
              <span className='fs-5'>Login 🔐</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav