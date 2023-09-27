import React from 'react'
import "../ErrorComponents/error.css"
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
  return (
    <div className='error_components'>
        <div>
            <h1 style={{display:'inline'}}>{error.status}</h1><span>{error.statusText}</span>
        </div>
        <div>
            <p style={{fontStyle:"italic"}}>{error.data}</p>
        </div>
    </div>
  )
}

export default Error