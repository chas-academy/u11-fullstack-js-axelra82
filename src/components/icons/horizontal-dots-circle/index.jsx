/* eslint-disable react/prop-types */
import React from 'react'
import { useLocation } from 'react-router-dom'
import BaseIconComponent from '../base'

const HorizontalDotsCircleIconComponent = ({ color = '', classes = '', size = '' }) => {
    const location = useLocation()
    const { pathname } = location

    const graphic =
        pathname === '/more-about' ? (
            <>
                <circle cx="17" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="7" cy="12" r="1.5" />
                <path
                    d="M12,0.8C5.8,0.8,0.8,5.8,0.8,12s5,11.2,11.2,11.2s11.2-5,11.2-11.2S18.2,0.8,12,0.8z M12,20.8c-4.8,0-8.8-3.9-8.8-8.8
		c0-4.8,3.9-8.8,8.8-8.8c4.8,0,8.8,3.9,8.8,8.8C20.8,16.8,16.8,20.8,12,20.8z"
                />
            </>
        ) : (
            <>
                <circle cx="17" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="7" cy="12" r="1.5" />
                <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z" />
            </>
        )

    return <BaseIconComponent graphic={graphic} color={color} classes={classes} size={size} />
}

export default HorizontalDotsCircleIconComponent
