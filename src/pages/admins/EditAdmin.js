import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import { MdLockReset, MdOutlineSave } from 'react-icons/md'
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';
import { adminProfileInfoSchema, resetAdminPsswordSchema } from '../../FormValidations/AdminSchemas';
import editUserService from '../../services/editAdminService';

const CreateAdmin = () => {
  const {user} =useAuth()
  const {adminId} = useParams()
  const navigate = useNavigate()
  const [isFetching, setIsFetching] = useState(false)
  const [formBody, setFormBody] =useState( 
    {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      mobile: "",
      role:"admin"
    });
    const [passwrdData, setPasswordData] =useState( 
      {
        currentPassword: "",
        newPassword: "",
        newPasswordTwo: "",
      });
  

    const resetAdminPassword= async()=>{
      const myheaders = new Headers();
      myheaders.append('Content-Type', 'application/json');
      myheaders.append('Authorization', `Bearer ${user.token}`);

      const toastId = toast.loading('Reseting Password');
      const data = JSON.stringify(passwrdData);
      try{
          const res = await fetch(`http://localhost:4000/api/user/reset-password/${adminId}`, {
              method:"PUT",
              headers:myheaders,
              body:data
          })
          
          const response = await res.json();
          
          if(res.ok){
              toast.update(toastId, {render:'Password updated', type:'success', isLoading:false, autoClose:3000});
              setPasswordData({currentPassword: '', newPassword: '', newPasswordTwo: ''})
          }
          else{
              toast.update(toastId, {render:`${response.message}`, type:'error', isLoading:false, autoClose:3000});
          }
      }
      catch(err){
          console.log(err);
      }
    }

  const validateProfileInfoForm = async(e)=>{
    adminProfileInfoSchema
      .validate(formBody, { abortEarly: false })
      .then(async() => {
         await editUserService(formBody, user, adminId);
    })
      .catch((err) => {
        toast.error(`${err.errors[0]}`)
    });
  }

  const validateResetPasswordForm = async(e)=>{
    resetAdminPsswordSchema
      .validate(passwrdData, { abortEarly: false })
      .then(async() => {
         await resetAdminPassword();
    })
      .catch((err) => {
        toast.error(`${err.errors[0]}`)
    });
  }

  const handleSaveClick=async(e)=>{
    e.preventDefault()
    validateProfileInfoForm() 
  }

  const handleResetClick=async(e)=>{
    e.preventDefault()
    validateResetPasswordForm() 
  }

  const fetchAdmin = async()=>{
    try{
        setIsFetching(true)
        const res = await fetch(`http://localhost:4000/api/user/id/${adminId}`,{
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        const response = await res.json();
        if(res.ok){
          const {user} = response;
          setFormBody({
            firstName:user.firstName,
            lastName:user.lastName,
            userName:user.userName,
            email:user.email,
            mobile:user.mobile,
          })
        }
        else{
          toast.error(`${response.message}`)
        }
        setIsFetching(false)
    }catch(err){
        console.log(err);
    } 
  }
  useEffect(()=>{
    fetchAdmin()
  }, [])
  return ( 
    <div className='page create-admin-page'>
        <div className="page-wrapper">
            <div className="page-header">
                <h3>Edit Admin {formBody.lastName ? `(${formBody.lastName} ${formBody.firstName})`: ''}</h3>
            </div>
            <div className="page-body">
              <form action="" className='form form-type-2 bg-white shadow-5'>
                  <div className="form-body">
                      <div className="form-heading">
                          <h4>Profile Infos </h4>
                      </div>
                      <div className="form-line">
                          {
                              isFetching ? 
                              <>
                                  <Skeleton height={70}/>
                                  <Skeleton height={70}/>
                                  <Skeleton height={70}/>
                              </> 
                              :
                              <>
                                  {
                                      formBody ?
                                      <>
                                          <div className="input-wrapper">
                                              <label htmlFor="" className='label'>Username :</label>
                                              <input 
                                                  type="text" 
                                                  className='input' 
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
                                                  required
                                                  value={formBody.lastName}
                                                  onChange={(e)=> setFormBody({...formBody, lastName:`${e.target.value}`})}
                                                  />
                                          </div>
                                      </>
                                      :
                                      null
                                  }
                              </>
                          }
                      </div>
                      <div className="form-line">
                          {
                              isFetching ? 
                              <>
                                  <Skeleton height={70}/>
                                  <Skeleton height={70}/>
                              </> 
                              :
                              <>
                                  {
                                      formBody ?
                                      <>
                                          <div className="input-wrapper">
                                              <label htmlFor="" className='label'>Email :</label>
                                              <input 
                                                  type="text" 
                                                  className='input' 
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
                                                  required
                                                  value={formBody.mobile}
                                                  onChange={(e)=> setFormBody({...formBody, mobile:`${e.target.value}`})}
                                                  />
                                          </div>
                                      </>
                                      :
                                      null
                                  }
                              </>
                          }
                      </div>
                      <div className="form-buttons">
                          <button type='submit' className="btn" onClick={(e)=>{handleSaveClick(e)}}>
                            <MdOutlineSave className='icon'/> Save
                          </button>
                      </div>
                  </div>
              </form>
              <form action="" className='form form-type-2 bg-white shadow-5'>
                  <div className="form-body">
                      <div className="form-heading">
                          <h4>Reset Password</h4>
                      </div>
                      <div className="form-line">
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>Current Password :</label>
                              <input 
                                  type="password" 
                                  className='input' 
                                  required
                                  value={passwrdData.currentPassword}
                                  onChange={(e)=> setPasswordData({...passwrdData, currentPassword:`${e.target.value}`})}
                                />
                          </div>
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>New Password :</label>
                              <input 
                                  type="password" 
                                  className='input' 
                                  required
                                  value={passwrdData.newPassword}
                                  onChange={(e)=> setPasswordData({...passwrdData, newPassword:`${e.target.value}`})}
                                />
                          </div>
                          <div className="input-wrapper">
                              <label htmlFor="" className='label'>Confirm New Password :</label>
                              <input 
                                  type="password" 
                                  className='input' 
                                  required
                                  value={passwrdData.newPasswordTwo}
                                  onChange={(e)=> setPasswordData({...passwrdData, newPasswordTwo:`${e.target.value}`})}
                                  />
                          </div>
                      </div>
                      <div className="form-buttons">
                          <button type='submit' className="btn" onClick={(e)=>{handleResetClick(e)}}>
                            <MdLockReset className='icon'/> Reset
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