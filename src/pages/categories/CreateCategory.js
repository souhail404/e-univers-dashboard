import React, { useState } from 'react'
import Nb from '../../components/common/Nb'
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {CiSaveDown2} from 'react-icons/ci'
import { useNavigate } from 'react-router-dom';
import { createCategorySchema } from '../../FormValidations/CartegorySchema';
import createCategoryService from '../../services/CreateCategoryService';
import { MdOutlineSave } from 'react-icons/md';


const CreateCategory = () => {
  const navigate = useNavigate()

  const {user} = useAuth();

  const [category, setCategory] =useState(
    {
      title:'',
      description:''
    }
  )

  const validateForm = async(e)=>{
    createCategorySchema
      .validate(category, { abortEarly: false })
      .then(async() => {
        const {res , newCategoryId} = await createCategoryService(category, user);
        console.log('from outside: ', res);
        if(res){
          if(res.ok){
            navigate(`/categories/${newCategoryId}/edit`)
          }
        }
        
    })
      .catch((err) => {
        toast.error(`${err}`) 
    });
  }


  const handleSubmit =async(e)=>{
    e.preventDefault();
    validateForm()
  }

  return (
    <div className='page create-category-page'>
      <div className="page-wrapper">
        <div className="page-header">
            <h3>Create new category</h3>
        </div>
        <div className="page-body">
            <form className='form form-type-2 bg-white shadow-5' action="">
                <div className="form-body">
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Title :</label>
                            <input  type="text" 
                                    className='input' 
                                    placeholder='Ex: smartphones, laptops..'
                                    onChange={(e)=>{
                                      category.title = e.target.value.toLowerCase();
                                    }}/>
                            <Nb message='its better to make a little general'/>
                        </div>
                    </div>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>description :</label>
                            <textarea name="" id="" 
                                      className='input' 
                                      placeholder='Ex: something..' 
                                      required
                                      onChange={(e)=>{
                                        category.description = e.target.value.toLowerCase();
                                      }}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type='submit' className="btn" onClick={(e)=>{handleSubmit(e)}}>
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

const AddCategory= ({category , setCategory})=>{
  return(
    <>
     
    </>
  )
}


export default CreateCategory