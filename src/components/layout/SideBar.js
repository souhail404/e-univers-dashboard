import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from "../../assets/images/white-logo.png"
import userImage from '../../assets/images/user.png'
import { useAuth } from '../../hooks/useAuth'
import { useLogout } from '../../hooks/useLogout'

import {LuLayoutDashboard, LuUser, LuPackage2, LuStore, LuSettings} from 'react-icons/lu'
import {MdOutlineCategory, MdOutlineShoppingCart} from 'react-icons/md'
import {BiLogOut, BiListUl} from 'react-icons/bi'
import {AiOutlinePlusCircle, AiOutlineRight, AiOutlineLink} from 'react-icons/ai'



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
        <h3>E-Univers</h3>
      </div>
      <div className="sidebar-body">
        <nav className='nav-links-wrapper'>
          <Link to="/" className='link-wrapper'>
            <div className="icon"> <LuLayoutDashboard /> </div>
            <p>Dashboard</p>
          </Link>
          <Link to="/orders" className='link-wrapper'>
            <div className="icon"> <MdOutlineShoppingCart /> </div>
            <p>Orders</p>
          </Link>
          <LinksDropDown header='products' icon={<LuPackage2/>} show>
            <Link to="/products" className='link-wrapper-t2'>
              <div className="icon"> <BiListUl /> </div>
              <p>All Products</p>
            </Link>
            <Link to="/products/create" className='link-wrapper-t2'>
              <div className="icon"> <AiOutlinePlusCircle /> </div>
              <p>new Product</p>
            </Link>
          </LinksDropDown>
          <LinksDropDown header='categories' icon={<MdOutlineCategory/>}>
            <Link to="/categories" className='link-wrapper-t2'>
              <div className="icon"> <BiListUl /> </div>
              <p>All categories</p>
            </Link>
            <Link to="/categories/create" className='link-wrapper-t2'>
              <div className="icon"> <AiOutlinePlusCircle /> </div>
              <p>new category</p>
            </Link>
          </LinksDropDown>
          <Link to="/customers" className='link-wrapper'>
            <div className="icon"> <LuUser /> </div>
            <p>Customers</p>
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
          <div className="arrow">
            <AiOutlineRight/>
          </div>
        </Link>
        <div className='link-wrapper logout btn' onClick={()=>handleLogout()}>
          <div className="icon"><BiLogOut /></div>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

const LinksDropDown = ({icon, header, show , children})=>{
  const [isDisplay, setIsDisplay] = useState(false)
  useEffect(()=>{
    if(show){
      setIsDisplay(true)
    }
  },[])

  return(
    <div className={isDisplay ?'links-dd active' :'links-dd'}>
        <div className="link-wrapper dd-header" onClick={()=>setIsDisplay(!isDisplay)}>
          <div className="icon"> {icon} </div>
          <p>{header}</p>
          <div className="arrow">
            <AiOutlineRight/>
          </div>
        </div>
        {isDisplay ?
          <div className="dd-body">
          {children}
          </div>
        :null}
        
       
    </div>
  )
}
export default SideBar