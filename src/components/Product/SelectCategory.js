import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify';

const SelectCategory = ({setFilterCategory}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categoriesData, setCategoriesData] = useState([])
    const [options, setOptions] = useState([])
    
    const fetchCategories= async()=>{
        try{
            setIsLoading(true)
            const res = await fetch(`http://localhost:4000/api/category/`)
            const response = await res.json();
  
            if(res.ok){
              const {categories} = response;
              setCategoriesData(categories);
            }
            else{
              toast.error(`${response.message}`)
            }
            setIsLoading(false)
        }catch(err){
            console.log(err);
            setIsLoading(false)
        } 
    }
    

    useEffect(()=>{
        fetchCategories()
    },[])

    useEffect(()=>{
        let selectOpts = [{value:'', label:'All categories'}]

        categoriesData.forEach(category =>{
            selectOpts.push({value:category._id, label:`${category.title}`})
        })
        setOptions(selectOpts)
    },[categoriesData])

    return (
        <div className='tlh-right--elem'>
            <Select
                className="basic-single-select"
                classNamePrefix="select Product"
                isLoading={isLoading}
                name="categories"
                options={options}
                placeholder='Filter Categories'
                onChange={(e)=>setFilterCategory(e.value)}
            />
        </div>
        
    )
}

export default SelectCategory