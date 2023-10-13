import React, { useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { MdOutlineSave } from 'react-icons/md'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createAdminSchema } from '../../FormValidations/AdminSchemas'
import createAdminService from '../../services/CreateAdminService'
import PageHeading from '../../components/common/PageHeading'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const CreateCustomer = () => {
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
      role:"customer"
  });
  
  const validateForm = async(e)=>{
    createAdminSchema
      .validate(formBody, { abortEarly: false })
      .then(async() => {
        const response = await createAdminService(formBody, user);
        if(response){
          if(response.ok){
            navigate('/customers')
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
    <main className="page create-customer-page">
      <section className='white-bg-section flex-c-jb header-200 mb1'>
          <PageHeading title={`Create Customer`} />
          <div className='f-r-c-c header-200__right'>
                <Link to={`/customers`} type="button" className='type-200__button'>
                    <AiOutlineArrowLeft style={{fontSize:'20px'}} />
                    <p>Back</p>
                </Link> 
          </div>
      </section>
      <form className='form form-type-2 bg-white shadow-5'>
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
              <button type='submit' className='type-200__button' onClick={(e)=>{handleSaveClick(e)}}>
                <MdOutlineSave style={{fontSize:'20px'}} /> 
                <p>save</p>
              </button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default CreateCustomer