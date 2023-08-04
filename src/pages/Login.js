import React, { useEffect } from 'react'
import {useFormik} from 'formik'
import {useLogin} from '../hooks/UseLogin'
import logo from '../assets/images/white-logo.png'

import {BiLogIn} from 'react-icons/bi'


const Login = () => {

  const {login, isLoading, error} = useLogin()
  const onSubmit = async()=>{
    const data = JSON.stringify(values)
    await login(data)
  }

  const {values , errors, touched,  handleBlur , handleChange , handleSubmit} = useFormik({
    initialValues:{
      userRef:'',
      password:'',
    },
    onSubmit
  })

  useEffect(()=>{
    
  },[])

  return (
    <div className='page login-page'>
      <div className="login-page-header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h2>Welcome to admin dashboard</h2>
      </div>
      <form action="post" className="login-form form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3>Login please</h3>
        </div>
        <div className="form-body">
          <div className="form-group">
            <div className="form-line">
              <div className='input-wrapper'>
                <label className='label' htmlFor="user-ref">Username, Email or Mobile</label>
                <input 
                      type="text" 
                      value={values.userRef} 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id='userRef' 
                      name='userRef' 
                      className='input' 
                      placeholder='Your Username, Email or Mobile...' 
                />
                {/* <span className="error"></span> */}
              </div>
            </div>
            <div className="form-line">
              <div className='input-wrapper'>
                <label className='label' label='label' htmlFor="password">Password</label>
                <input type="text" 
                      value={values.password} 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id='password' 
                      name='password' 
                      className='input' 
                      placeholder='Enter your password'
                />
                <span className="error"></span>
              </div>
            </div>
          </div>
          
        </div>
        <div className='form-actions'>
          <div className="action-elem">
            <button type='submit' className="btn">
              <div className="icon">
                <BiLogIn />
              </div>
              <p>login</p>
            </button>
          </div>
        </div>
        <div className="form-error">
          <p></p>
        </div>
      </form>
      {/* <div className="login-page-footer">
        <Footer />
      </div> */}
    </div>
  )
}

export default Login