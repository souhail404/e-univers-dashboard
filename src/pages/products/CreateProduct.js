import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import {AiOutlineArrowLeft, AiOutlineEye, AiOutlinePlus } from 'react-icons/ai';

import {CiSaveDown2} from 'react-icons/ci'

import Nb from '../../components/common/Nb';
import createProductService from '../../services/createProductService';
import ProductGeneralInfo from '../../components/Product/CreateForm/ProductGeneralInfo';
import ProductPricing from '../../components/Product/CreateForm/ProductPricing';
import ProductVariants from '../../components/Product/CreateForm/ProductVariants';
import ProductImages from '../../components/Product/CreateForm/ProductImages';
import { createProductSchema } from '../../FormValidations/ProductSchema';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeading from '../../components/common/PageHeading';
import { MdOutlineSave } from 'react-icons/md';

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
    validateForm()
  }
 
  return (
    <main className='page create-product-page'>
        <section className='white-bg-section flex-c-jb header-200 mb1'>
            <PageHeading title={`Create product`} />
            <div className='f-r-c-c header-200__right'>
                <Link to={`/products`} type="button" className='type-200__button'>
                    <AiOutlineArrowLeft style={{fontSize:'20px'}} />
                    <p>Back</p>
                </Link> 
            </div>
        </section>
        <form className='form create-product-form' action="">
            <div className="form-body">
                <div className="form-group mb1">
                    <ProductGeneralInfo formBody={formBody} setFormBody={setFormBody} />
                </div>
                <div className="form-group mb1">
                    <ProductPricing formBody={formBody} setFormBody={setFormBody} />
                </div>
                <div className="form-group mb1">
                    <ProductImages formBody={formBody} setFormBody={setFormBody} />
                </div>
                <Nb message='if the product has different variants (like Colrs, Sizes, Storage... ) please enable this field and add them.' />
                <div className="form-group mb1">
                    <ProductVariants formBody={formBody} setFormBody={setFormBody} />
                </div>
            </div>
            <div className="form-buttons white-bg-section flex-c-jb">
                <div></div>
                <div>
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


export default CreateProduct