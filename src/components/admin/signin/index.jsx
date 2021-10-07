import React from 'react'
import { Link } from 'react-router-dom'

const AdminSignInPage = () => {
    return (
        <>
            <p>Sign in</p>
            <Link to="/admin/panel">Admin Panel</Link>
            <br />
            <small>You will need to have administrator access to enter panel</small>
            <br />
            <Link to="/">Home</Link>
        </>
    )
}

export default AdminSignInPage
