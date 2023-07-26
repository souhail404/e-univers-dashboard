import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navigate = (props) => {
    const navigate =useNavigate()

    useEffect(()=>{
        navigate(props.to)
    })
    return (
        <></>
    )
}

export default Navigate