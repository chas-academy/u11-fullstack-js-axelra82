/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Button } from 'react-bootstrap'
import MenuComponent from '../../components/menu'
import PostIcon from '../../components/icons/post'

const BottomComponent = () => {
    return (
        <footer
            id="bottom-panel"
            className="d-md-none position-fixed vw-100 border-top bg-white fixed-bottom"
            style={{ zIndex: 98 }}
        >
            <Button
                className="position-absolute py-2 px-2 rounded-circle"
                style={{ top: '-107%', right: '3%' }}
            >
                <PostIcon color="white" size="extra-large" classes="m-2" />
            </Button>
            <MenuComponent />
        </footer>
    )
}

export default BottomComponent
