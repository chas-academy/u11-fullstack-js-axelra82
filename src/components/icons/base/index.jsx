/* eslint-disable react/prop-types */
import React from 'react'

const BaseIconComponent = ({
    graphic = null,
    color = 'black',
    size = '',
    classes = '',
    style = {},
    box = '0 0 24 24',
}) => {
    return (
        <svg
            className={`custom-icon ${size !== '' ? `icon-${size}` : ''} fill-${color} ${classes}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={box}
            style={style}
        >
            {graphic}
        </svg>
    )
}

export default BaseIconComponent
