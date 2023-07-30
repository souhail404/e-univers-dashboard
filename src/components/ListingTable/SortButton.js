import React from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const SortButton = ({title, value, sortConf, setSortConf }) => {
    
    const handleHeaderClick = (field) => {
        if (field === sortConf.sortField) {
          setSortConf({...sortConf, sortOrder:`${sortConf.sortOrder === 'asc' ? 'desc' : 'asc'}`});
        } else {
          setSortConf({sortField:field, sortOrder:'asc'});
        }
    };  
    return (
        <button type='button' className='sort-btn f-r-c-c' onClick={() => handleHeaderClick(value)}>
        <p>{title}</p> 
            <div className="icon f-c-c-c"> 
                <AiOutlineUp className={(sortConf.sortField===value && sortConf.sortOrder==='desc')?'desc': ''}/> 
                <AiOutlineDown className={(sortConf.sortField===value && sortConf.sortOrder==='asc')?'asc': ''} /> 
            </div>
        </button>
    )
}

export default SortButton