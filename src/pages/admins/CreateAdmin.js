import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import { MdOutlineSave } from 'react-icons/md'
import { toast } from 'react-toastify';
import createAdminService from '../../services/CreateAdminService';
import { createAdminSchema } from '../../FormValidations/AdminSchemas';

const CreateAdmin = () => {
  const {user} =useAuth()
  const navigate = useNavigate()
  const [formBody, setFormBody] =useState( 
    {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      mobile: "",
      password: "",
      passwordTwo: "",
      role:"admin"
    });
  
  const validateForm = async(e)=>{
    createAdminSchema
      .validate(formBody, { abortEarly: false })
      .then(async() => {
        const response = await createAdminService(formBody, user);
        if(response){
          if(response.ok){
            navigate('/settings?tab=admins')
          }
        }
        
    })
      .catch((err) => {
        toast.error(`${err.errors[0]}`)
    });
  }

  const handleSaveClick=async(e)=>{ 
    e.preventDefault()
    validateForm() 
  }

  return ( 
    <div className='page create-admin-page'>
        <div className="page-wrapper">
            <div className="page-header">
                <h3>Create new admin</h3>
            </div>
            <div className="page-body">
                <form className='form form-type-2 bg-white shadow-5' action="">
                    <div className="form-body">
                        <div className="form-line">
                          <div className="input-wrapper">
                          <label htmlFor="" className='label'>Username :</label>
                          <input 
                              type="text" 
                              className='input' 
                              placeholder='Ex: Jhon'
                              required
                              value={formBody.userName}
                              onChange={(e)=> setFormBody({...formBody, userName:`${e.target.value}`})}
                            />
                          </div>
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>First Name :</label>
                              <input 
                                  type="text" 
                                  className='input' 
                                  placeholder='Ex: Doe'
                                  required
                                  value={formBody.firstName}
                                  onChange={(e)=> setFormBody({...formBody, firstName:`${e.target.value}`})}
                                />
                          </div>
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>Last Name :</label>
                              <input 
                                  type="text" 
                                  className='input'
                                  placeholder='Ex: Jhon404' 
                                  required
                                  value={formBody.lastName}
                                  onChange={(e)=> setFormBody({...formBody, lastName:`${e.target.value}`})}
                                  />
                          </div>
                        </div>
                        <div className="form-line">
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>Email :</label>
                              <input 
                                  type="text" 
                                  className='input' 
                                  placeholder='Ex: Jhon@gmail.com'
                                  required
                                  value={formBody.email}
                                  onChange={(e)=> setFormBody({...formBody, email:`${e.target.value}`})}
                                  />
                          </div>
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>Mobile :</label>
                              <input 
                                  type="number" 
                                  className='input' 
                                  placeholder='Ex: 0606060606'
                                  required
                                  value={formBody.mobile}
                                  onChange={(e)=> setFormBody({...formBody, mobile:`${e.target.value}`})}
                                  />
                          </div>  
                        </div>
                        <div className="form-line">
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>Password :</label>
                              <input 
                                  type="password" 
                                  className='input' 
                                  required
                                  value={formBody.password}
                                  onChange={(e)=> setFormBody({...formBody, password:`${e.target.value}`})}
                                />
                          </div>
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>Confirm Password :</label>
                              <input 
                                  type="password" 
                                  className='input' 
                                  required
                                  value={formBody.passwordTwo}
                                  onChange={(e)=> setFormBody({...formBody, passwordTwo:`${e.target.value}`})}
                                  />
                          </div>  
                        </div>
                        <div className="form-buttons">
                            <button type='submit' className="btn" onClick={(e)=>{handleSaveClick(e)}}>
                              <MdOutlineSave className='icon'/> Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateAdmin