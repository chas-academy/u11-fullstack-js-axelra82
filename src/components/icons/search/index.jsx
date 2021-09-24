import React from 'react'
import { useLocation } from 'react-router-dom'
import BaseIconComponent from '../base'

// eslint-disable-next-line react/prop-types
const SearchIconComponent = ({ size = '', classes = '' }) => {
    const location = useLocation()
    const { pathname } = location

    const graphic =
        pathname === '/search' ? (
            <path
                d="M22.2,19.8l-3-3C20.4,15,21,13,21,11c0-5.5-4.5-10-10-10C5.5,1,1,5.5,1,11s4.5,10,10,10c2,0,4-0.6,5.7-1.8l3,3
c0.3,0.3,0.8,0.5,1.2,0.5s0.9-0.2,1.2-0.5c0.3-0.3,0.5-0.8,0.5-1.2C22.8,20.5,22.6,20.1,22.2,19.8z M11,17.5c-3.6,0-6.5-2.9-6.5-6.5
c0-3.6,2.9-6.5,6.5-6.5s6.5,2.9,6.5,6.5C17.5,14.6,14.6,17.5,11,17.5z"
            />
        ) : (
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        )

    return <BaseIconComponent graphic={graphic} color="black" size={size} classes={classes} />
}

export default SearchIconComponent
