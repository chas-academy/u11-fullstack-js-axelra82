/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Button } from 'react-bootstrap'
import BottomMenuComponent from './menu'
import PostIcon from '../../components/icons/post'
import './style.scss'

const BottomComponent = () => {
    return (
        <aside id="bottom-panel">
            <Button className="position-absolute py-2 px-2 rounded-circle">
                <PostIcon color="white" size="extra-large" classes="m-2" />
            </Button>
            <BottomMenuComponent />
        </aside>
    )
}

export default BottomComponent
