/* eslint-disable no-console */
import React from 'react'
import LeftComponent from '../left'
import MiddleComponent from '../middle'
import BottomComponent from '../bottom'

const AppComponent = () => {
    return (
        <main id="app-container">
            <LeftComponent />
            <MiddleComponent />
            <BottomComponent />
        </main>
    )
}

export default AppComponent
