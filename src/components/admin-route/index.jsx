/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import StoreContext from '../../context/StoreContext'

const AdminRoute = ({ component: Page, path, ...rest }) => {
    const {
        store: { currentUser },
    } = useContext(StoreContext)
    const { role } = currentUser || {}

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return role === 'administrator' ? (
                    <Page {...props} page={path} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/admin',
                        }}
                    />
                )
            }}
        />
    )
}

export default AdminRoute
