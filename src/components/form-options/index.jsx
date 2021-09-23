/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const FormOptionsComponent = ({ options }) => {
    const { action = '', route = '', message = '' } = options

    return (
        <>
            <div className="w-100 text-center text-size-medium mt-1">
                {message} <Link to={`/${route}`}>{action}</Link>
            </div>
            <div className="w-100 text-center text-size-medium mt-1">
                Continue without an account? <Link to="/">Browse</Link>
            </div>
        </>
    )
}

export default FormOptionsComponent
