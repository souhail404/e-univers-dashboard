import React, { useEffect, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai';

import {BsFillPlusCircleFill } from 'react-icons/bs'
import VariantsField from '../../Form/VariantsField';


const ProductVariants = ({formBody , setFormBody})=>{
    const [showBody, setShowBody]=useState(false);

    const [hasVariants, setHasVariants] = useState(false);
    const [variants, setVariants] = useState([]);

    const handleAddVariant = () => {
        setVariants([...variants, { name: '', options: [{value:'',priceDef:'0',available:true}] }]);
    };

    useEffect(()=>{
        setFormBody({...formBody, variants:variants})
    },[variants])
    
    useEffect(()=>{
        if(hasVariants){
            setShowBody(true)
            setVariants([{ name: '', options: [{value:'',priceDef:'0',available:true}] }])
        }
        else{
            setShowBody(false)
            setVariants([])
        }
    },[hasVariants])

    return(
        <>  
            <div className="outer-block">
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown/> </button>
                    </div>
                    <div className="heading">
                        <p className='block-header'>Variants</p>
                        <div className='block-actions'>
                            <div className="action">
                                <label htmlFor="has-variants" className='toggle-switcher'>
                                    <input type="checkbox" name="has-variants" id="has-variants" onChange={(e)=>{setHasVariants(e.target.checked)}} />
                                    <span className='slider round'></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                        {hasVariants ? 
                            <>
                            {
                                variants.map((variant, varIndex)=>{
                                    return(
                                        <VariantsField  key={varIndex}
                                                        varIndex={varIndex} 
                                                        variant={variant} 
                                                        variants={variants} 
                                                        setVariants={setVariants}
                                            />
                                    ) 
                                })
                            }
                            <button type="button" className='add-variant-btn' onClick={()=>{handleAddVariant()}}> <div className="icon"><BsFillPlusCircleFill/></div> <p>Add another variant</p></button>
                            </>
                        : null}
                </div>
            </div>
        </>  
    )
    
}

export default ProductVariants