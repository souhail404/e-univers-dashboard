import React from 'react'

const AddAdmin =({formBody, setFormBody})=>{
    return(
        <>
            <div className="form-line">
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>userName :</label>
                    <input 
                            type="text" 
                            className='input' 
                            placeholder='Ex: Admin400' 
                            required 
                            value={formBody.userName}
                            onChange={(e)=> setFormBody({...formBody, userName:`${e.target.value}`})}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>First name :</label>
                    <input 
                        type="text" 
                        className='input' 
                        placeholder='Ex: Jhon..' 
                        required
                        value={formBody.firstName}
                        onChange={(e)=> setFormBody({...formBody, firstName:`${e.target.value}`})}
                        />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>last name :</label>
                    <input 
                        type="text" 
                        className='input' 
                        placeholder='Ex: Doe..' 
                        required
                        value={formBody.lastName}
                        onChange={(e)=> setFormBody({...formBody, lastName:`${e.target.value}`})}
                        />
                </div>
            </div>
            <div className="form-line">
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>email :</label>
                    <input 
                        type="email" 
                        className='input' 
                        placeholder='Ex: jhon@mail.com' 
                        required
                        value={formBody.email}
                        onChange={(e)=> setFormBody({...formBody, email:`${e.target.value}`})}
                        />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>Mobile :</label>
                    <input 
                        type="number" 
                        className='input' 
                        placeholder='Ex: +2126900606' 
                        required
                        value={formBody.mobile}
                        onChange={(e)=> setFormBody({...formBody, mobile:`${e.target.value}`})}
                        />
                </div>
            </div>
            <div className="form-line">
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>Password :</label>
                    <input 
                        type="password" 
                        className='input' 
                        required
                        value={formBody.password}
                        onChange={(e)=> setFormBody({...formBody, password:`${e.target.value}`})}
                        />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="" className='label'>confirm Password :</label>
                    <input 
                        type="password" 
                        className='input' 
                        required
                        value={formBody.passwordTwo}
                        onChange={(e)=> setFormBody({...formBody, passwordTwo:`${e.target.value}`})}
                        />
                </div>
            </div>
        </>
    )
}

export default AddAdmin