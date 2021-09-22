/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import StoreContext from './context/StoreContext'
import {
    SignUpPage,
    SignInPage,
    NotFound,
    TermsOfServicePage,
    IntegrityPloicyPage,
    CookiePolicyPage,
} from './pages'
import AppComponent from './layout/app'

const PageRoutes = () => {
    const { currentUser } = useContext(StoreContext)

    // Protected routes for pages not accessible to guests
    const ProtectedRoute = ({ component: Page, path, ...rest }) => {
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
                                pathname: '/signup',
                            }}
                        />
                    )
                }}
            />
        )
    }

    return (
        <Switch>
            <ProtectedRoute exact path="/profile" component={AppComponent} />
            <ProtectedRoute exact path="/messages" component={AppComponent} />
            <Route exact path="/search" component={AppComponent} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/terms" component={TermsOfServicePage} />
            <Route exact path="/integrity-policy" component={IntegrityPloicyPage} />
            <Route exact path="/cookie-policy" component={CookiePolicyPage} />
            <Route exact path="/" component={AppComponent} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default PageRoutes
