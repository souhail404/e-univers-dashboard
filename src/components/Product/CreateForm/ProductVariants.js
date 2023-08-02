import React, { useEffect, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai';

import {BsFillPlusCircleFill } from 'react-icons/bs'
import VariantsField from '../../Form/VariantsField';


const ProductVariants = ({formBody , setFormBody})=>{
    const [showBody, setShowBody]=useState(true);

    const [hasVariants, setHasVariants] = useState(true);
    const [variants, setVariants] = useState([
        {   name: '', 
            options: [
                {
                  value:'', 
                  priceDef:'',
                  available:true 
                }
            ] 
        }]);

    const handleAddVariant = () => {
        setVariants([...variants, { name: '', options: [{value:'',priceDef:'',available:true}] }]);
    };
    
    const handleRemoveVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleAddOption = (index) => {
        const updatedVariants = [...variants];
        updatedVariants[index].options.push({value:'',priceDef:'',available:true});
        setVariants(updatedVariants);
    };

    const handleRemoveOption = (variantIndex, optionIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].options.splice(optionIndex, 1);
        setVariants(updatedVariants);
    };

    useEffect(()=>{
        setFormBody({...formBody, variants:variants})
    },[variants])
    
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
                                    <input type="checkbox" name="has-variants" id="has-variants" onChange={(e)=>{setHasVariants(e.target.checked)}} defaultChecked />
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