import React from 'react';

const Input = (props) => {
    const {value, error, touched} = props;
    const {handleBlur, handleChange} = props.formik;
    const { type, name, label, placeholder} = props;
    return (
        <div className='input-wrapper' key={props.key}>
            <div className={`label-d-input ${error && touched ? 'error' : ''}`}>
                {label && <label className='label' htmlFor={name}>{label}</label>}
                <input className='input' type={type} placeholder={placeholder} name={name} id={name} value={value} onBlur={handleBlur} onChange={handleChange} /> 
            </div>
            <div className='error-msg'>
                {error && touched && <p className='msg-txt'>* {error}</p>}
            </div>
        </div>
    )
}

export default Input