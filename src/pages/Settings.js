import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import {MdOutlineManageAccounts, MdOutlineOnlinePrediction, MdOutlineStorefront, MdOutlineAdminPanelSettings, MdOutlinePassword} from 'react-icons/md'
import AccountTab from '../components/SettingsMultiTab/AccountTab';
import PasswordTab from '../components/SettingsMultiTab/PasswordTab';
import PixelTab from '../components/SettingsMultiTab/PixelTab';
import AdminsTable from '../components/tables/AdminsTable';
import BannerTab from '../components/SettingsMultiTab/BannerTab';

const Settings = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const tabParam = queryParams.get("tab")
  
  const [tab, setTab] = useState(tabParam || 'account');

  return (
    <div className='page settings-page'> 
      <div className="page-header">
        <h2>General Settings</h2> 
      </div>
      <section className='multi-tab-section'>
        <nav className='multi-tab-nav-hor'>
          <Link className={`multi-tab-link ${tab==='account'?'active':''}`} to='?tab=account' onClick={()=>setTab('account')}> <MdOutlineManageAccounts className='icon'/> Account</Link>
          <Link className={`multi-tab-link ${tab==='store'?'active':''}`} to='?tab=store' onClick={()=>setTab('store')}><MdOutlineStorefront className='icon'/> Store</Link>
          <Link className={`multi-tab-link ${tab==='online'?'active':''}`} to='?tab=online' onClick={()=>setTab('online')}> <MdOutlineOnlinePrediction className='icon'/> Online</Link>
          <Link className={`multi-tab-link ${tab==='admins'?'active':''}`} to='?tab=admins' onClick={()=>setTab('admins')}><MdOutlineAdminPanelSettings className='icon' /> Admins</Link>
          <Link className={`multi-tab-link ${tab==='password'?'active':''}`} to='?tab=password' onClick={()=>setTab('password')}><MdOutlinePassword className='icon' /> Password</Link>
        </nav>
        <div className="tabs-body">
          <div className={`selected-tab-wrapper ${tab==='account'?'active':''}`}>
            <div className="selected-tab-header">
              <h3>Manage Account</h3>
            </div>
            {tab==='account'?<AccountTab />:null}
            
          </div>
          <div className={`selected-tab-wrapper ${tab==='store'?'active':''}`}>
            <div className="selected-tab-header">
              <h3>Manage Store</h3>
            </div>
            {tab==='store'?<BannerTab />:null}
          </div>
          <div className={`selected-tab-wrapper ${tab==='online'?'active':''}`}>
            <div className="selected-tab-header">
              <h3>Manage Pixels</h3>
            </div>
            {tab==='online'?<PixelTab />:null}
            
          </div>
          <div className={`selected-tab-wrapper ${tab==='admins'?'active':''}`}>
            <div className="selected-tab-header">
              <h3>Manage Admins</h3>
            </div>
            {tab==='admins'?<AdminsTable />: null}
          </div>
          <div className={`selected-tab-wrapper ${tab==='password'?'active':''}`}>
            <div className="selected-tab-header">
              <h3>Manage Password</h3>
            </div>
              {tab==='password'?<PasswordTab />:null}
              
          </div>
        </div>
      </section>
    </div>
  )
}

export default Settings