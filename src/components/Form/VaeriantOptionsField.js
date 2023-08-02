import React from 'react'
import pluralize from 'pluralize';
import { FiTrash2 } from 'react-icons/fi';

const VaeriantOptionsField = ({varIndex, optIndex, setVariants, variants, variant, option}) => {

    const handleRemoveOption = (variantIndex, optionIndex) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].options.splice(optionIndex, 1);
        setVariants(updatedVariants);
    };

    return (
        <>
            <div className="opt opt-header">
                <p>{variant.name ? `${pluralize.singular(variant.name.trim())} ${optIndex+1}` : `Option ${optIndex+1}`}</p>
            </div>
            <div className="opt opt-body">
                <div className="input-wrapper">
                    <input type="text" id={`optVal-${optIndex}`} name={`optVal-${optIndex}`} className="input" placeholder='Value : (Ex: Red)'
                            value={option.value ? option.value: ''}
                            onChange={(e) =>{
                                const updatedVariants = [...variants];
                                updatedVariants[varIndex].options[optIndex].value = e.target.value;
                                setVariants(updatedVariants);
                            }}/> 
                </div>    
                <div className="input-wrapper">
                    <input type="number" className="input" placeholder='Price (Ex: +3$)' required id={`optPrice-${optIndex}`} name={`optPrice-${optIndex}`}
                            value={option.priceDef ? option.priceDef: ''}
                            onChange={(e)=>{
                                const updatedVariants = [...variants];
                                updatedVariants[varIndex].options[optIndex].priceDef = e.target.value;
                                setVariants(updatedVariants);
                            }} /> 

                </div>    
                <div className="input-wrapper inline">
                    <label htmlFor={`available-${optIndex}`} className="label">active :</label>
                    <label htmlFor={`available-${optIndex}`} className='toggle-switcher'>
                        <input type="checkbox" name={`available-${optIndex}`} id={`available-${optIndex}`} defaultChecked
                                value={option.available ? option.available: ''}
                                onChange={(e)=>{
                                    const updatedVariants = [...variants];
                                    updatedVariants[varIndex].options[optIndex].available = e.target.checked;
                                    setVariants(updatedVariants);
                                }} />
                        <span className='slider round'></span>
                    </label>
                </div>
                <div className="option-action">
                    <button type='button' className='delete-btn remove-option-btn f-r-c-c' onClick={()=>{handleRemoveOption(varIndex,optIndex)}}><FiTrash2 /></button>
                </div>
            </div>
        </>
    )
}

export default VaeriantOptionsField