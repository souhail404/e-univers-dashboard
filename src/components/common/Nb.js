import React, { useState } from 'react'
import {BsInfoSquareFill} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'

const Nb = ({message}) => {
  const [display, setDisplay] = useState(true)
  return (
    <>
   {display ?
    <div className="nb-info">
        <div className="nb-body">
            <div className="icon">
              <BsInfoSquareFill/>
            </div>
            <p>{message}</p>
        </div>
        <button className='del-btn' type="button" onClick={()=>setDisplay(false)}> <AiOutlineClose/> </button>
    </div>
    : null} 
   </>
  )
}

export default Nb