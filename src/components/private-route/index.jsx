/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import StoreContext from '../../context/StoreContext'

const PrivateRoute = ({ component: Page, path, ...rest }) => {
    const {
        store: { currentUser },
    } = useContext(StoreContext)

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return currentUser ? (
                    <Page {...props} page={path} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                        }}
                    />
                )
            }}
        />
    )
}

export default PrivateRoute
