import React, { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai';

const ProductPricing = ({formBody , setFormBody})=>{
    
    const [showBody, setShowBody]=useState(true);
    
    return(
        <>  
            <div className="outer-block">
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown /> </button>
                    </div>
                    <div className="heading">
                        <h6 className='block-header'>Pricing</h6>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Selling Price :</label>
                            <input 
                                    type="number" 
                                    className='input' 
                                    placeholder='Ex: 30$..' 
                                    required
                                    value={formBody.sellPrice}
                                    onChange={(e)=> setFormBody({...formBody, sellPrice:`${e.target.value}`})}
                                />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Comparing Price :</label>
                            <input 
                                    type="number" 
                                    className='input' 
                                    placeholder='Ex: 40$..' 
                                    value={formBody.comparePrice}
                                    onChange={(e)=> setFormBody({...formBody, comparePrice:`${e.target.value}`})}
                                />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Cost Price :</label>
                            <input 
                                    type="number" 
                                    className='input' 
                                    placeholder='Ex: 20$..' 
                                    value={formBody.costPrice}
                                    onChange={(e)=> setFormBody({...formBody, costPrice:`${e.target.value}`})}
                                />
                        </div>
                    </div>  
                </div>
            </div>
        </>  
    )
    
}

export default ProductPricing