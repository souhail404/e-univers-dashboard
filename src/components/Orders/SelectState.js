import React, { useEffect, useState } from 'react'
import Select from 'react-select'


const SelectState = ({setFilterState}) => {
    const [isLoading, setIsLoading] = useState(false);

    let options = [
        {value:'', label:'All states'},
        {value:'pending', label:'pending'},
        {value:'processing', label:'processing'},
        {value:'delivered', label:'delivered'},
        {value:'backorder', label:'backorder'},
    ]

    return (
        <div className='tlh-right--elem'>
            <Select
                className="basic-single-select"
                classNamePrefix="select Product"
                isLoading={isLoading}
                name="products"
                options={options}
                placeholder='Filter State'
                onChange={(e)=>setFilterState(e.value)}
            />
        </div>
    )
}

export default SelectState