/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
    SignUpPage,
    SignInPage,
    NotFound,
    TermsOfServicePage,
    IntegrityPloicyPage,
    CookiePolicyPage,
} from './pages'
import AppComponent from './layout/app'
import PrivateRoute from './components/private-route'

const PageRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/profile" component={AppComponent} />
            <PrivateRoute exact path="/messages" component={AppComponent} />
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
