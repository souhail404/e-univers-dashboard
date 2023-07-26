import React from 'react'

const SelectInput = (props) => {
    const {value, error, touched} = props;
    const {handleBlur, handleChange} = props.formik;
    const { name, label, data } = props;
    return (
        <div className="input-wrapper">
            <label htmlFor={name} className="label">{label}</label>
            <select className='input' name={name} id={name} onChange={handleChange} value={value} onBlur={handleBlur}>
                <option value="">--</option>
                {
                    data.map((el, index) =>{
                        return(
                            <option key={index} value={el._id}>{el.title}</option>  
                        )
                    })
                }
            </select>
            {/* <div className="input-error">
                <p className='error'></p>
            </div> */}
        </div>
    )
}

export default SelectInput