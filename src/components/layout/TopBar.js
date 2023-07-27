import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './TopBar.css'

import {BsEye} from 'react-icons/bs'

const TopBar = () => {
  return (
    <div id='topbar'>
        <div className="logo">
          <h3>Welcome to dashboard </h3>
        </div>
        <div className="right-side">
          <nav className="navbar">
            <div className="nav-links">
                <Link className='btn top-link-wrpr' to="/"> 
                  <div className="icon"><BsEye /></div> 
                  <p>View store</p>
                </Link>
            </div>
          </nav>
        </div>
        
    </div>
  )
}

export default TopBar