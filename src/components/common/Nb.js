import React from 'react'

const Nb = ({message}) => {
  return (
    <div className="nb-info">
        <div className="nb-body">
            <p><b> Note : </b> {message}</p>
        </div>
        <button className='del-btn' type="button">X</button>
    </div>
  )
}

export default Nb