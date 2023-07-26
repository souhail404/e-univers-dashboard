import React from 'react'
import { Link } from 'react-router-dom'
import logoImg from "../../assets/images/white-logo.png"
import userImage from '../../assets/images/user.png'
import { useAuth } from '../../hooks/useAuth'
import { useLogout } from '../../hooks/useLogout'

import {LuLayoutDashboard, LuUser, LuPackage2, LuStore, LuSettings} from 'react-icons/lu'
import {MdOutlineCategory, MdOutlineShoppingCart} from 'react-icons/md'
import {BiLogOut} from 'react-icons/bi'



const SideBar = () => {
  const {user} = useAuth()
  const {logout} = useLogout()

  const handleLogout = ()=>{
    logout()
  }
  return (
    <div id='sidebar'>
      <div className="sidebar-header">
        <div className="logo">
          <img src={logoImg} alt="" />
        </div>
        <h3>E-univers</h3>
      </div>
      <div className="sidebar-body">
        <nav className='nav-links-wrapper'>
          <Link to="/" className='link-wrapper'>
            <div className="icon"> <LuLayoutDashboard /> </div>
            <p>Dashboard</p>
          </Link>
          <Link to="/customers" className='link-wrapper'>
            <div className="icon"> <LuUser /> </div>
            <p>Customers</p>
          </Link>
          <Link to="/product" className='link-wrapper'>
            <div className="icon"> <LuPackage2 /> </div>
            <p>Product</p>
          </Link>
          <Link to="/category" className='link-wrapper'>
            <div className="icon"> <MdOutlineCategory /> </div>
            <p>Catgorys</p>
          </Link>
          <Link to="/orders" className='link-wrapper'>
            <div className="icon"> <MdOutlineShoppingCart /> </div>
            <p>Orders</p>
          </Link>
          <Link to="/store" className='link-wrapper'>
            <div className="icon"> <LuStore /> </div>
            <p>Store</p>
          </Link>
          <Link to="/settings" className='link-wrapper'>
            <div className="icon"> <LuSettings /> </div>
            <p>Settings</p>
          </Link>
        </nav>
      </div>
      <div className="sidebar-footer">
        <Link to="/account" className='link-wrapper profile'>
          <div className="img"><img src={userImage} alt="admin" /></div>
          <p>{user ? user.user: null}</p>
        </Link>
        <div className='link-wrapper logout btn' onClick={()=>handleLogout()}>
          <div className="icon"><BiLogOut /></div>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar