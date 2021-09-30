/* eslint-disable react/prop-types */
import React from 'react'
import BaseIconComponent from '../base'

const HorizontalDotsIconComponent = ({ color = '', classes = '', size = '' }) => {
    const graphic = (
        <>
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
        </>
    )

    return <BaseIconComponent graphic={graphic} color={color} classes={classes} size={size} />
}

export default HorizontalDotsIconComponent
