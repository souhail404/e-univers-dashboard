import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify';


const SelectMultiProducts = ({setSelectedProduct}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [options, setOptions] = useState([])

    const fetchProducts = async()=>{
        try{
            setIsLoading(true)
            const res = await fetch(`http://localhost:4000/api/product?pageSize=100`)
            const response = await res.json();
            if(res.ok){
              const {products} = response;
              setProducts(products);
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
        fetchProducts()
    },[])

    useEffect(()=>{
        let selectOpts = []
        products.forEach(product =>{ 
            selectOpts.push({
                value:product._id, 
                label:product.title, 
                itemPrice:product.sellPrice, 
                quantity:1, 
                itemId:product._id, 
                totalPriceDef:0,
                itemOptions:
                    product.variants?.map((variant, i)=>{
                        return {variantId:variant._id}
                    })
                , 
                variants:product.variants})
        })

        setOptions(selectOpts)
    },[products])


    return ( 
        <div className='tlh-right--elem'>
            <Select
                className="basic-single-select"
                classNamePrefix="select Product"
                placeholder='Select products'
                isLoading={isLoading}
                name="products"
                options={options}
                onChange={(e)=>setSelectedProduct(e)}
            />
        </div>
    )
}

export default SelectMultiProducts