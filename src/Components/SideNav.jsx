import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <div className='sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100'>
      <div>
        <a href="d-flex align-items-center">
          <i className='bi bi-bootstrap fs-5 me-2'></i>
          <span className='fs-4'>Sidebar</span>
        </a>
        <hr className='text-secondary mt-2'/>
        <ul className='nav nav-pills flex-column p-0 m-0'>
          <li className='nav-item p-1'>
            <Link to="/" className='nav-link text-white'>
              <i className='bi bi-speedometer me-2 fs-5'></i>
              <span className='fs-5'>Dashboard</span>
            </Link>
          </li>
          <li className='nav-item p-1'>
            <Link to="order" className='nav-link text-white'>
              <i className='bi bi-table me-2 fs-5'></i>
              <span className='fs-5'>Orders</span>
            </Link>
          </li>
          <li className='nav-item p-1'>
            <a href="" className='nav-link text-white'>
              <i className='bi bi-people me-2 fs-5'></i>
              <span className='fs-5'>Customers</span>
            </a>
          </li>
          <li className='nav-item p-1'>
            <a href="" className='nav-link text-white'>
              <i className='bi bi-grid me-2 fs-5'></i>
              <span className='fs-5'>Report</span>
            </a>
          </li>
        </ul>
        <div>
          <hr className='text-secondary'/>
          <i className='bi bi-person fs-5'></i>
          <span className='fs-4'>Ariam</span>
        </div>
      </div>
    </div>
  )
}


export default SideNav