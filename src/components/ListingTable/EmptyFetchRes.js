import React from 'react'
import {TbError404} from 'react-icons/tb'

const EmptyFetchRes = ({text}) => {
  return (
    <div className='empty-fetch-result f-c-c-c'>
        <div className="icon f-r-c-c"><TbError404 /></div>
        <p>{text}</p>
    </div>
  )
}

export default EmptyFetchRes