import React, { useState } from 'react'

import {MdOutlineAttachMoney, MdOutlineShoppingCart, MdPerson4, MdPersonOutline, MdShowChart} from 'react-icons/md'
import { Link } from 'react-router-dom'
import TopProductTable from '../components/Dashboard/TopProductTable'
import TopCustomerTable from '../components/Dashboard/TopCustomerTable'

const Home = () => {
  const [period , setPeriod] = useState('week')
  return (
    <main className='page home-page'>
      <section className='overview-cards-wrapper'>
        <div className="stat-overview-card">
            <div className="header">
              <div className='icon'>
                <MdOutlineShoppingCart /> 
              </div>
              <div className='txt'>
                <p className="head-txt">Orders</p>
                <p className="period-txt">this {period}</p>
              </div>
            </div>  
            <div className="content">
              <p className='data'>360</p>
              <p className="stats"><MdShowChart/> <span>+12,25 %</span> </p>
            </div>
        </div>
        <div className="stat-overview-card">
          <div className="header">
            <div className='icon'>
              <MdOutlineAttachMoney /> 
            </div>
            <div className='txt'>
              <p className="head-txt">Income</p>
              <p className="period-txt">this {period}</p>
            </div>
          </div>  
          <div className="content">
            <p className='data'>2.800 Dhs</p>
            <p className="stats"><MdShowChart/> <span>+33,17 %</span> </p>
          </div>
        </div>
        <div className="stat-overview-card">
          <div className="header">
            <div className='icon'>
              <MdPersonOutline /> 
            </div>
            <div className='txt'>
              <p className="head-txt">New Customers</p>
              <p className="period-txt">this {period}</p>
            </div>
          </div>  
          <div className="content">
            <p className='data'>17</p>
            <p className="stats"><MdShowChart/> <span>+4 %</span> </p>
          </div>
        </div>
      </section>

      <TopProductTable period={period} />
      <TopCustomerTable period={period} />
    </main>
  )
}

export default Home