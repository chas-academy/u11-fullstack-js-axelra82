import React from 'react'

// eslint-disable-next-line react/prop-types
const BaseIconComponent = ({ graphic = null, color = 'black', size = '', classes = '' }) => {
    return (
        <svg
            className={`custom-icon ${size !== '' ? `icon-${size}` : ''} fill-${color} ${classes}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {graphic}
        </svg>
    )
}

export default BaseIconComponent
