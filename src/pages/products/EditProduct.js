import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
import { AiOutlineEye } from 'react-icons/ai';
import { CiSaveDown2 } from 'react-icons/ci';
import editProductService from '../../services/editProductService';

const EditProduct = () => {
    const {user} =useAuth()
    const {productId} = useParams()
    const [product, setProduct] =useState({});
    const [isFetching, setIsFetching] =useState(false);

    const [formBody, setFormBody] =useState();

    
    const handleSaveClick=async(e)=>{
        e.preventDefault()
        await editProductService(formBody, user, productId)
    }

    useEffect(()=>{
        setIsFetching(true)
        fetchService(`http://localhost:4000/api/product/${productId}` , setProduct, setIsFetching)
    },[])

    useEffect(()=>{
        var existingImages = []; 

        if(product.images){
            existingImages = product.images.map((image) => ({
                isSaved: true,
                url: image.url,
            }));
        }
        setFormBody({
            title:product.title, 
            slugTitle:product.slugTitle,
            category:product.category,
            subcategory:product.subcategory,
            miniDescription:product.miniDescription, 
            description:product.description ,
            sellPrice:product.sellPrice, 
            comparePrice:product.comparePrice, 
            costPrice:product.costPrice, 
            images:existingImages, 
            variants:product.variants,
        })
    },[product])

    return (
        <div className='page create-product-page'>
            {isFetching ? 
                <>
                    <Skeleton height={45} width={200}/>
                    <Skeleton height={100}/>
                    <Skeleton height={100}/>
                    <Skeleton height={100}/>
                    <Skeleton height={100}/>                    
                </>
                :
                <div className="page-wrapper">
                    <div className="page-header">
                        <h3>Edit product ({product.title})</h3>
                    </div>
                    {formBody ?
                        <div className="page-body">
                            <form className='form create-product-form' action="">
                                <div className="form-body">
                                    <div className="form-group">
                                        {formBody.title ? <ProductGeneralInfo formBody={formBody} setFormBody={setFormBody} /> :null}
                                    </div>
                                    <div className="form-group">
                                        {formBody.sellPrice ? <ProductPricing formBody={formBody} setFormBody={setFormBody} /> :null}
                                    </div>
                                    <div className="form-group">
                                        {formBody.images ? <ProductImages formBody={formBody} setFormBody={setFormBody} /> :null}
                                    </div>
                                    <div className="form-group">
                                        {formBody.variants ? <ProductVariants formBody={formBody} setFormBody={setFormBody} /> :null}
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
                                        <button className="btn" onClick={(e)=>handleSaveClick(e)}>
                                            <div className="icon">
                                                <CiSaveDown2 />
                                            </div>
                                            <p>Save</p>
                                        </button>   
                                    </div>
                                </div>
                            </form>
                        </div>
                    : null}
                </div>
            }
            
        </div>
    )
}

export default EditProduct