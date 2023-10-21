import React, { useState } from 'react'
import Nb from '../../components/common/Nb'
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {CiSaveDown2} from 'react-icons/ci'
import { Link, useNavigate } from 'react-router-dom';
import { createCategorySchema } from '../../FormValidations/CartegorySchema';
import createCategoryService from '../../services/CreateCategoryService';
import { MdOutlineSave } from 'react-icons/md';
import PageHeading from '../../components/common/PageHeading';
import { AiOutlineArrowLeft } from 'react-icons/ai';


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
    <main className='page create-category-page'>
      <section className='white-bg-section flex-c-jb header-200 mb1'>
            <PageHeading title={`Create category`} />
            <div className='f-r-c-c header-200__right'>
              <Link to={`/categories`} type="button" className='type-200__button'>
                  <AiOutlineArrowLeft style={{fontSize:'20px'}} />
                  <p>Back</p>
              </Link> 
            </div>
      </section>
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
                <button type='submit' className='type-200__button' onClick={(e)=>{handleSubmit(e)}}>
                  <MdOutlineSave style={{fontSize:'20px'}}/> 
                  <p>save</p> 
                </button>
            </div>
        </div>
      </form>
    </main>
  )
}

const AddCategory= ({category , setCategory})=>{
  return(
    <>
     
    </>
  )
}


export default CreateCategory