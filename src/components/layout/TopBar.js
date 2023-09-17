import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import './TopBar.css'

// import {BsEye} from 'react-icons/bs'

const TopBar = () => {
  const [currentDate, setCurrentDate]= useState();
  useEffect(()=>{
    const weekDays= ['Sunday', 'Monday', 'Tuesday ', 'Wednesday', 'Thursday', 'Thursday', 'Saturday']
    const date = new Date();
    setCurrentDate(`${weekDays[date.getDay()]} ${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`)
  },[])
  return (
    <div id='topbar'>
        <div className="logo">
          <p>{currentDate} </p>
        </div>
        {/* <div className="right-side">
          <nav className="navbar">
            <div className="nav-links">
                <Link className='btn top-link-wrpr' to="/"> 
                  <div className="icon"><BsEye /></div> 
                  <p>View store</p>
                </Link>
            </div>
          </nav>
        </div> */}
        
    </div>
  )
}

export default TopBar