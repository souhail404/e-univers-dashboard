import React, { useState } from 'react'
import Nb from '../../components/common/Nb'
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {CiSaveDown2} from 'react-icons/ci'
import {AiOutlineDown, AiOutlineAppstoreAdd} from 'react-icons/ai'
import {FiTrash2} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';


const CreateCategory = () => {
  const navigate = useNavigate()

  const {user} = useAuth();
  const {token} = user;

  const myheaders = new Headers();
  myheaders.append('Content-Type', 'application/json');
  myheaders.append('Authorization', `Bearer ${token}`);

  const [category, setCategory] =useState(
    {
      title:'',
      description:''
    }
  )

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const id = toast.loading("Saving new category...");

    const data = JSON.stringify({...category});
    try{
      const res = await fetch('http://localhost:4000/api/category/add', {
        method:"POST",
        headers:myheaders,
        body:data
      })
      const response = await res.json();
      
      if(res.ok){
        toast.update(id, {render: "Category Saved Succefully", type: "success", isLoading: false, autoClose:8000});
        const newCategoryId = response.category._id;
        navigate(`../${newCategoryId}/edit`)
      }
      else{
        toast.update(id, {render: `${response.message}`, type: "error", isLoading: false, autoClose:8000});
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='page create-category-page'>
      <div className="page-wrapper">
        <div className="page-header">
            <h2>Create new category</h2>
        </div>
        <div className="page-body">
            <form className='form create-product-form' action="">
                <div className="form-haeder">
                    
                </div>
                <div className="form-body">
                    <div className="form-group">
                      <AddCategory category={category} setCategory={setCategory} />
                    </div>
                </div>
                <div className="form-actions">
                    <div className="action-elem">
                        <button className="btn" onClick={(e)=>handleSubmit(e)}>
                            <div className="icon">
                                <CiSaveDown2 />
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

const AddCategory= ({category , setCategory})=>{
  return(
    <>
      <div className="form-line">
          <div className="input-wrapper">
              <label htmlFor="" className='label'>Title :</label>
              <input  type="text" 
                      className='input' 
                      placeholder='Ex: smartphones, laptops..'
                      onChange={(e)=>{
                        category.title = e.target.value;
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
                          category.description = e.target.value;
                        }}
              ></textarea>
          </div>
      </div>
    </>
  )
}


export default CreateCategory