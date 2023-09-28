import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import {AiOutlineEye } from 'react-icons/ai';

import {CiSaveDown2} from 'react-icons/ci'

import Nb from '../../components/common/Nb';
import createProductService from '../../services/createProductService';
import ProductGeneralInfo from '../../components/Product/CreateForm/ProductGeneralInfo';
import ProductPricing from '../../components/Product/CreateForm/ProductPricing';
import ProductVariants from '../../components/Product/CreateForm/ProductVariants';
import ProductImages from '../../components/Product/CreateForm/ProductImages';
import { createProductSchema } from '../../FormValidations/ProductSchema';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const navigate = useNavigate()
  const {user} =useAuth()
  const [formBody, setFormBody] =useState(
    {
        title:'', 
        slugTitle:'',
        category:'',
        subcategory:'',
        miniDescription:'', 
        description:'' ,
        sellPrice:'', 
        comparePrice:'', 
        costPrice:'', 
        images:[], 
        variants:[]
    });

    const validateForm = async(e)=>{
        createProductSchema
          .validate(formBody, { abortEarly: false })
          .then(async() => {
            const response = await createProductService(formBody, user);
            if(response){
              if(response.ok){
                navigate('/products')
              }
            }
            
        })
          .catch((err) => {
            toast.error(`${err.errors[0]}`)
        });
    }
 
  const handleSaveClick=async(e)=>{
    e.preventDefault()
    console.log(formBody);
    validateForm()
  }

  return (
    <div className='page create-product-page'>
        <div className="page-wrapper">
            <div className="page-header">
                <h1 className="l-h">Create new product</h1>
            </div>
            <div className="page-body">
                <form className='form create-product-form' action="">
                    <div className="form-body">
                        <div className="form-group">
                            <ProductGeneralInfo formBody={formBody} setFormBody={setFormBody} />
                        </div>

                        <div className="form-group">
                            <ProductPricing formBody={formBody} setFormBody={setFormBody} />
                        </div>
                        <div className="form-group">
                            <ProductImages formBody={formBody} setFormBody={setFormBody} />
                        </div>
                        <Nb message='if the product has different variants (like Colrs, Sizes, Storage... ) please enable this field and add them.' />
                        <div className="form-group">
                            <ProductVariants formBody={formBody} setFormBody={setFormBody} />
                        </div>
                    </div>
                    <div className="form-actions">
                        <div className="action-elem">
                                <button type='button' className="btn gray">
                                    <div className="icon">
                                        <AiOutlineEye />
                                    </div>
                                    <p>Preview</p>
                                </button>   
                        </div>
                        <div className="action-elem">
                            <button type='submit' className="btn" onClick={(e)=>handleSaveClick(e)}>
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


export default CreateProduct