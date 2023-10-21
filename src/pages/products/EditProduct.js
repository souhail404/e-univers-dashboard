import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

// services
import fetchService from '../../services/fetchService';
// components
import { Skeleton } from '@mui/material';
import ProductGeneralInfo from '../../components/Product/EditForm/ProductGeneralInfo';
import ProductPricing from '../../components/Product/EditForm/ProductPricing';
import ProductVariants from '../../components/Product/EditForm/ProductVariants';
import ProductImages from '../../components/Product/EditForm/ProductImages';
// icons 
import { AiOutlineArrowLeft, AiOutlineEye } from 'react-icons/ai';
import { CiSaveDown2 } from 'react-icons/ci';
import editProductService from '../../services/editProductService';
import { createProductSchema } from '../../FormValidations/ProductSchema';
import { toast } from 'react-toastify';
import PageHeading from '../../components/common/PageHeading';
import { MdOutlineSave } from 'react-icons/md';
import BASE_URL from '../../APIurl';

const EditProduct = () => {
    const navigate = useNavigate()
    const {user} =useAuth()
    const {productId} = useParams()
    const [product, setProduct] =useState({});
    const [isFetching, setIsFetching] =useState(false);

    const [formBody, setFormBody] =useState();

    const validateForm = async(e)=>{
        createProductSchema
          .validate(formBody, { abortEarly: false })
          .then(async() => {
            const response = await editProductService(formBody, user, productId);
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
        validateForm();
    }

    useEffect(()=>{
        setIsFetching(true)
        fetchService(`${BASE_URL}api/product/${productId}` , setProduct, setIsFetching)
    },[])

    useEffect(()=>{
        var existingImages = []; 

        if(product.images){
            existingImages = product.images.map((image) => ({
                isSaved: true,
                ...image
            }));
        }
        setFormBody({
            title:product.title, 
            slugTitle:product.slugTitle,
            category:product?.category?._id,
            subcategory:product?.subcategory?._id,
            miniDescription:product.miniDescription, 
            description:product.description ,
            sellPrice:product.sellPrice, 
            comparePrice:product.comparePrice, 
            costPrice:product.costPrice, 
            images:existingImages, 
            deletedImages:[],
            variants:product.variants,
        })
    },[product])


    return (
        <main className='page create-product-page'>
            {isFetching ? 
                <>
                    <Skeleton height={45} width={200}/>
                    <Skeleton height={100}/>
                    <Skeleton height={100}/>
                    <Skeleton height={100}/>
                    <Skeleton height={100}/>                    
                </>
                :
                <>  
                    <section className='white-bg-section flex-c-jb header-200 mb1' >
                        <PageHeading title={`Edit product (${product.title})`} />
                        <div className='f-r-c-c header-200__right'>
                            <Link to={`/products`} className='type-200__button'>
                                <AiOutlineArrowLeft style={{fontSize:'20px'}} />
                                <p>Back</p>
                            </Link> 
                        </div>
                    </section>
                    {formBody ?
                        <div className="page-body">
                            <form className='form create-product-form' action="">
                                <div className="form-body">
                                    <div className="form-group mb1">
                                        {formBody.title ? <ProductGeneralInfo formBody={formBody} setFormBody={setFormBody} /> :null}
                                    </div>
                                    <div className="form-group mb1">
                                        {formBody.sellPrice ? <ProductPricing formBody={formBody} setFormBody={setFormBody} /> :null}
                                    </div>
                                    <div className="form-group mb1">
                                        {formBody.images ? <ProductImages formBody={formBody} setFormBody={setFormBody} /> :null}
                                    </div>
                                    <div className="form-group mb1">
                                        {formBody.variants ? <ProductVariants formBody={formBody} setFormBody={setFormBody} /> :null}
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
                        </div>
                   : null}
                </> 
            }
            
        </main>
    )
}

export default EditProduct