import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import PageRoutes from './routes'
import ContextProvider from './provider/ContextProvider'
import './style/style.scss'

ReactDOM.render(
    <ContextProvider>
        <BrowserRouter>
            <PageRoutes />
        </BrowserRouter>
    </ContextProvider>,
    document.getElementById('root')
)
