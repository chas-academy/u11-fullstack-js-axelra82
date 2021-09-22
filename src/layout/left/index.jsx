import React, { useContext } from 'react'
import StoreContext from '../../context/StoreContext'
import Logotype from '../../components/logotype'
import LeftMenuComponent from './menu'
import LeftUserComponent from './user'
import './style.scss'

const LeftComponent = () => {
    const {
        store: { currentUser },
    } = useContext(StoreContext)

    return (
        <aside id="left-panel">
            <Logotype />
            <LeftMenuComponent isAuthed={currentUser} />
            {currentUser && <LeftUserComponent />}
        </aside>
    )
}

export default LeftComponent
