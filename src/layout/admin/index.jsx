/* eslint-disable no-unused-vars */
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AdminSignIn, AdminPanel } from '../../components/admin'

const AdminComponent = () => {
    const location = useLocation()
    const { pathname } = location

    const Content = () => {
        switch (pathname) {
            case '/admin/panel':
                return <AdminPanel />
            default:
                return <AdminSignIn />
        }
    }

    return (
        <Container fluid="xl">
            <Content />
        </Container>
    )
}

export default AdminComponent
