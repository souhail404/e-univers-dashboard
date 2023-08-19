import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import { MdSave } from 'react-icons/md'
import AddAdmin from '../../components/forms/AddAdmin';
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
                <form className='form create-product-form' action="">
                    <div className="form-body">
                        <div className="form-group">
                            <AddAdmin formBody={formBody} setFormBody={setFormBody} />
                        </div>
                    </div>
                    <div className="form-actions">
                        <div className="action-elem">
                            <button type="submit" className="btn" onClick={(e)=>handleSaveClick(e)}>
                                <div className="icon">
                                    <MdSave />
                                </div>
                                <p>Save</p>
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