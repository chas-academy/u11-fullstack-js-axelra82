import React from 'react'
import BaseIconComponent from '../base'

// eslint-disable-next-line react/prop-types
const ArrowExternalIconComponent = ({ color = 'black' }) => {
    const graphic = (
        <path d="M17 6H8.43c-.554 0-1 .447-1 1s.446 1 1 1h6.156l-9.293 9.293c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L16 9.414v6.157c0 .554.447 1 1 1s1-.446 1-1V7c0-.553-.447-1-1-1z" />
    )

    return <BaseIconComponent graphic={graphic} color={color} />
}

export default ArrowExternalIconComponent
