import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import StoreContext from '../../context/StoreContext'
import Logotype from '../../components/logotype'
import LeftMenuComponent from './menu'
import LeftUserComponent from './user'

const LeftComponent = () => {
    const {
        store: { currentUser },
    } = useContext(StoreContext)

    return (
        <Col sm={2} md={3} as="aside" className="d-none d-md-block p-0 border-end">
            <section className="sticky-top min-vh-100 pe-xl-5 d-flex flex-column">
                <Logotype />
                <LeftMenuComponent />
                {currentUser && <LeftUserComponent />}
            </section>
        </Col>
    )
}

export default LeftComponent
