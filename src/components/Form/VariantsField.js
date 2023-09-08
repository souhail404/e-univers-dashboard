import React from 'react'
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import VaeriantOptionsField from './VaeriantOptionsField';


const VariantsField = ({varIndex, setVariants, variants, variant}) => {

    const handleRemoveVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleAddOption = (index) => {
        const updatedVariants = [...variants];
        updatedVariants[index].options.push({value:'',priceDef:'0',available:true});
        setVariants(updatedVariants);
    };


  return (
    <div key={varIndex} className="variant-wrapper">
        <div className='variant-elem variant-name'>
            <div className="input-wrapper">
                <input type="text" className="input" id={`variantName-${varIndex}`} name={`variantName-${varIndex}`} placeholder='Variant Name : (Ex: Colors, Size, Storage...)' 
                    required
                    value={variant.name}
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
                        <VaeriantOptionsField 
                                optIndex={optIndex}
                                option={opt}
                                varIndex={varIndex}
                                variant={variant}
                                variants={variants}
                                setVariants={setVariants}
                            />
                    </div>
                )
            })
        }  
        <button type='button' className='add-option-btn' onClick={()=>handleAddOption(varIndex)}>
                <div className="icon"><AiOutlineAppstoreAdd/> </div> 
                <p>add option</p> 
        </button>
        </div>
        <button type='button' className='delete-btn remove-variant-btn f-r-c-c' onClick={()=>handleRemoveVariant(varIndex)}><div className="icon f-r-c-c"><FiTrash2/></div></button>
    </div>                                    
  )
}

export default VariantsField