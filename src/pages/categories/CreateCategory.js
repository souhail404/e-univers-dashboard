import React, { useState } from 'react'
import Nb from '../../components/common/Nb'

import {CiSaveDown2} from 'react-icons/ci'
import {AiOutlineDown} from 'react-icons/ai'



const CreateCategory = () => {
  return (
    <div className='page create-product-page'>
      <div className="page-wrapper">
        <div className="page-header">
            <h2>Create new category</h2>
        </div>
        <div className="page-body">
            <form className='form create-product-form' action="">
                <div className="form-haeder">
                    
                </div>
                <div className="form-body">
                    <div className="form-group">
                      <AddCategory />
                    </div>

                    <div className="form-group">
                      <AddSubCategories />
                    </div>
                </div>
                <div className="form-actions">
                    <div className="action-elem">
                        <button className="btn">
                            <div className="icon">
                                <CiSaveDown2 />
                            </div>
                            <p>Save</p>
                        </button>   
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

const AddCategory= ()=>{
  return(
    <>
      <div className="form-line">
          <div className="input-wrapper">
              <label htmlFor="" className='label'>Title :</label>
              <input type="text" className='input' placeholder='Ex: smartphones, laptops..' required/>
              <Nb message='its better to make a little general'/>
          </div>
      </div>
      <div className="form-line">
          <div className="input-wrapper">
              <label htmlFor="" className='label'>description :</label>
              <textarea className='input' placeholder='Ex: something..' required> </textarea>
          </div>
      </div>
    </>
  )
}

const AddSubCategories= ()=>{
  const [showBody, setShowBody]=useState(true)
  return(
    <>
      <div className="outer-block">
                <div className="outer-block-header">
                    <div className="body-toggler">
                        <button className={showBody ? `toggler-btn active` : `toggler-btn`} type="button" onClick={()=>setShowBody(!showBody)}> <AiOutlineDown/> </button>
                    </div>
                    <div className="heading">
                        <p className='block-header'>Sub Categories</p>
                    </div>
                </div>
                <div className={showBody ? `outer-block-body active` : `outer-block-body`}>
                    <div className="form-line">
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Selling Price :</label>
                            <input type="number" className='input' placeholder='Ex: iphone 9..' required/>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Comparing Price :</label>
                            <input type="text" className='input' placeholder='Ex: iphone-9..' />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="" className='label'>Cost Price :</label>
                            <input type="text" className='input' placeholder='Ex: iphone-9..' />
                        </div>
                    </div>  
                </div>
      </div>
    </>
  )
}
export default CreateCategory