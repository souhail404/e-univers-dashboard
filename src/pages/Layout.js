import React from 'react'
import SideBar from '../components/layout/SideBar'
import TopBar from '../components/layout/TopBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import { useAuth } from '../hooks/useAuth'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  const {user} = useAuth()
  return (
    <>  
      { 
        user ?
        <div id="app-side">
          <SideBar />   
        </div>
        : null
      }
        

        <div id="app-main">
            {user ? <TopBar /> : null}
            <div id="main">
              <ToastContainer />
              <Outlet /> 
            </div>
            <Footer />
        </div>
    </>
  )
}


export default Layout