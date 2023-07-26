import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

import {FiTrash2} from 'react-icons/fi'
import pluralize from 'pluralize';

const AddVariants = () => {
    const { productId } = useParams();
    const {user} = useAuth();
    const {token} = user;
    const [product , setProduct] = useState({});

    const [hasVariants, setHasVariants] = useState(true);
    const [variants, setVariants] = useState([
        {   name: '', 
            options: [
                {
                  value:'', 
                  price_def:'',
                  image:'',
                  available:true 
                }
            ] 
        }]);

    const handleAddVariant = () => {
        setVariants([...variants, { name: '', options: [{value:'',price_def:'',image:'',available:true}] }]);
    };
    
    const handleRemoveVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleAddOption = (index) => {
        const updatedVariants = [...variants];
        updatedVariants[index].options.push({value:'',price_def:'',image:'',available:true});
        setVariants(updatedVariants);
    };

    const handleRemoveOption = (variantIndex, optionIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].options.splice(optionIndex, 1);
        setVariants(updatedVariants);
    };

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${token}`);
    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
                const response = await fetch(`http://localhost:4000/api/product/${productId}`, {
                    method: 'GET',
                    headers: myheaders
                });

                const data = await response.json()
                setProduct(data);
            }
            catch(err){
                console.log(err);
            }
        }

        fetchProduct();
    },[])

    const handleSubmit = async() => {
        try{
            console.log(JSON.stringify({variants:variants}));
            const response = await fetch(`http://localhost:4000/api/product/${productId}/variants/add/`, {
                method: 'POST',
                headers: myheaders,
                body:JSON.stringify({variants:variants})
            });

            const data = await response.json()
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    };
  return (
    <div className='page add-variant-page'>
        <div className="page-route">
            <Link className='route' to='../'>Products</Link> 
            <span className='slash'>/</span>
            <Link className='route' to='../'>{product.title}</Link> 
            <span className='slash'>/</span>
            <Link className='route'>Add product</Link>
        </div>

        <form action="" className="add-variant-form form" onSubmit={handleSubmit}>  
            <FormHeader />
            <div className="form-body">
                <div className="input-wrapper">
                    <label className='label' htmlFor="">Does the product have variants like(Colors, Storage, Size...) ?</label>
                    <div className="toggle-switch">
                        <button type='button' className='btn yes' onClick={()=>{setHasVariants(true)}} >Yes</button>
                        <button type='button' className='btn no' onClick={()=>{setHasVariants(false)}} >No</button>
                    </div>
                </div>
                {hasVariants ? 
                    <>
                    {
                        variants.map((variant, varIndex)=>{
                            return(
                                <div key={varIndex} className="variant-wrapper">
                                    <div className='variant-elem variant-name'>
                                        <div className="input-wrapper">
                                            <label htmlFor={`variantName-${varIndex}`} className="label">Variant name :</label>
                                            <input type="text" className="input" id={`variantName-${varIndex}`} name={`variantName-${varIndex}`} placeholder='Ex: Colors, Size, Storage...' 
                                                   onChange={(e)=>{
                                                    const updatedVariants = [...variants];
                                                    updatedVariants[varIndex].name = e.target.value;
                                                    setVariants(updatedVariants);
                                            }}/> 
                                        </div>
                                    </div>
                                    <div className='variant-elem variant-options'>
                                       {
                                         variant.options.map((opt , optIndex)=>{
                                            return(
                                                <div key={optIndex} className="option-wrapper">
                                                    <div className="opt opt-header">
                                                        <p>{variant.name ? `${pluralize.singular(variant.name.trim())} ${optIndex+1}` : `Option ${optIndex+1}`}</p>
                                                    </div>
                                                    <div className="opt opt-body">
                                                        <div className="input-wrapper">
                                                            <label htmlFor={`optVal-${optIndex}`} className="label">value :</label>
                                                            <input type="text" id={`optVal-${optIndex}`} name={`optVal-${optIndex}`} className="input" placeholder='Ex: Red'
                                                                    onChange={(e) =>{
                                                                        const updatedVariants = [...variants];
                                                                        updatedVariants[varIndex].options[optIndex].value = e.target.value;
                                                                        setVariants(updatedVariants);
                                                                    }}/> 
                                                        </div>    
                                                        <div className="input-wrapper">
                                                            <label htmlFor={`optPrice-${optIndex}`} className="label">price :</label>
                                                            <input type="number" className="input" placeholder='Ex: +3$' id={`optPrice-${optIndex}`} name={`optPrice-${optIndex}`}
                                                                    onChange={(e)=>{
                                                                        const updatedVariants = [...variants];
                                                                        updatedVariants[varIndex].options[optIndex].price_def = e.target.value;
                                                                        setVariants(updatedVariants);
                                                                    }} /> 
                                                        </div>    
                                                        <div className="input-wrapper">
                                                            <label htmlFor={`optImg-${optIndex}`} className="label">image:</label>
                                                            <input type="file" className="input" id={`optImg-${optIndex}`} name={`optImg-${optIndex}`}
                                                                    onChange={(e)=>{
                                                                        const updatedVariants = [...variants];
                                                                        updatedVariants[varIndex].options[optIndex].image = e.target.value;
                                                                        setVariants(updatedVariants);
                                                                    }} /> 
                                                        </div>
                                                        <div className="input-wrapper">
                                                            <label htmlFor={`available-${optIndex}`} className="label">available in stock?</label>
                                                            <select className='input' name={`available-${optIndex}`} id={`available-${optIndex}`} 
                                                                onChange={(e)=>{
                                                                    const updatedVariants = [...variants];
                                                                    updatedVariants[varIndex].options[optIndex].available = e.target.value;
                                                                    setVariants(updatedVariants);
                                                                }}
                                                                >
                                                                <option value={true}>Yes</option>
                                                                <option value={false}>No</option>
                                                            </select>
                                                        </div>
                                                        <div className="option-action">
                                                            <button type='button' className='btn delete' onClick={()=>{handleRemoveOption(varIndex,optIndex)}}><FiTrash2 /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                         })
                                       }  
                                       <button type='button' className='add-option-btn' onClick={()=>handleAddOption(varIndex)}>+ add option</button>
                                    </div>
                                    <button type='button' className='btn remove-variant-btn' onClick={()=>handleRemoveVariant(varIndex)}><div className="icon"><FiTrash2/></div>Remove Variant</button>
                                </div>
                            ) 
                        })
                    }
                    <button type="button" className='btn add-variant-btn' onClick={()=>{handleAddVariant()}}>Add another variant</button>
                    </>
                    : null}
            </div>

            <div className="form-actions">
                <div className="act-el">
                    <div className="btn btn-2">
                        <p>go back</p>
                        <div className="icon">
                            
                        </div>
                    </div>
                </div>
                <div className="act-el">
                    <div className="btn" onClick={()=>{handleSubmit()}}>
                        <p>next</p>
                        <div className="icon">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

const FormHeader = ()=>{
    return(
        <div className="form-header">
                <h3>add product variants</h3>
        </div>
    )
}

const FormActions = ()=>{
    return(
        <div className="form-actions">
            <div className="act-el">
                <div className="btn btn-2">
                    <p>go back</p>
                    <div className="icon">
                        
                    </div>
                </div>
            </div>
            <div className="act-el">
                <div className="btn">
                    <p>next</p>
                    <div className="icon">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVariants