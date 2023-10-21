import React, { useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { Skeleton } from '@mui/material'
import { adminProfileInfoSchema } from '../../FormValidations/AdminSchemas'
import { MdOutlineSave } from 'react-icons/md'
import editUserService from '../../services/editAdminService'
import PageHeading from '../../components/common/PageHeading'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import BASE_URL from '../../APIurl'

const EditCustomer = () => {
  const {user} =useAuth()
  const {customerId} = useParams()
  const [isFetching, setIsFetching] = useState(false)
  const [formBody, setFormBody] =useState( 
    {
      _id:"",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      mobile: "",
      role:"customer"
    });

  const fetchCustomer = async()=>{
    try{
        setIsFetching(true)
        const res = await fetch(`${BASE_URL}api/user/id/${customerId}`,{
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        const response = await res.json();
        if(res.ok){
          const {user} = response;
          setFormBody({
            _id:user._id,
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

  const validateProfileInfoForm = async(e)=>{
    adminProfileInfoSchema
      .validate(formBody, { abortEarly: false })
      .then(async() => {
         await editUserService(formBody, user, customerId);
    })
      .catch((err) => {
        toast.error(`${err.errors[0]}`)
    });
  }

  const handleSaveClick=async(e)=>{
    e.preventDefault()
    validateProfileInfoForm() 
  }

  useEffect(()=>{
    fetchCustomer()
  }, [])


  return (
    <main className="page edit-customer-page">
        <section className='white-bg-section flex-c-jb header-200 mb1' >
          <PageHeading title={`Edit Customer ${formBody.lastName ? `(${formBody.lastName} ${formBody.firstName})`: ''}`} />
          <div className='f-r-c-c header-200__right'>
              { formBody._id ?
                <Link to={`/customers/${formBody?._id}/details`} className='type-200__button'>
                  <FiEye style={{fontSize:'20px'}} />
                  <p>Details</p>
                </Link> : null
              }
              <Link to={`/customers`} className='type-200__button'>
                  <AiOutlineArrowLeft style={{fontSize:'20px'}} />
                  <p>Back</p>
              </Link> 
          </div>
        </section>
        <form action="" className='form form-type-2 bg-white shadow-5'>
            <div className="form-body">
                <div className="form-heading">
                    <h6>Profile Infos </h6>
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

export default EditCustomer