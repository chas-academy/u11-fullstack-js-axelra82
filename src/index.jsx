import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import ToastComponet from './components/toast'
import ModalComponent from './components/modal'
import PageRoutes from './routes'
import ContextProvider from './provider/ContextProvider'
import './style/style.scss'

ReactDOM.render(
    <BrowserRouter>
        <ContextProvider>
            <ToastComponet />
            <ModalComponent />
            <PageRoutes />
        </ContextProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
