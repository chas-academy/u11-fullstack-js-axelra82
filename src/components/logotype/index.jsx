/* eslint-disable react/prop-types */
import React from 'react'
import BaseIconComponent from '../icons/base'

const LogotypeComponent = ({ size = '', color = 'primary', classes = '', style = {} }) => {
    const graphic = (
        <path
            d="M512,97.1c-18.8,8.4-39,14-60.4,16.6c21.6-13,38.4-33.6,46.2-58.2c-20.2,12-42.8,20.8-66.8,25.4c-19-20.2-46.2-33-76.6-33
		c-58,0-105,47-105,105c0,8.2,1,16.2,2.8,24c-87.4-4.4-164.9-46.4-216.7-109.8c-9,15.6-14.2,33.6-14.2,52.8
		c0,36.4,18.6,68.6,46.8,87.4c-17.2-0.6-33.4-5.2-47.6-13.2v1.4c0,50.8,36.2,93.4,84.2,103c-8.8,2.4-18.2,3.6-27.6,3.6
		c-6.8,0-13.4-0.6-19.8-1.8c13.4,41.8,52.2,72.2,98.2,73c-36,28.2-81.2,45-130.5,45c-8.4,0-16.8-0.4-25-1.4
		c46.2,29.6,101.4,47,160.9,47c193.3,0,298.9-160.1,298.9-298.9c0-4.6-0.2-9-0.4-13.6C480,136.8,498,118.3,512,97.1L512,97.1z"
        />
    )

    return (
        <BaseIconComponent
            graphic={graphic}
            color={color}
            size={size}
            classes={classes}
            style={style}
            box="0 0 512 512"
        />
    )
}

export default LogotypeComponent
