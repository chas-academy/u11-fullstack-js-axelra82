/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import BottomMenuComponent from './menu'
import PostIcon from '../../components/icons/post'
import './style.scss'

const BottomComponent = () => {
    return (
        <aside id="bottom-panel">
            <a href="#" className="post-button bottom-post-button">
                <PostIcon />
            </a>
            <BottomMenuComponent />
        </aside>
    )
}

export default BottomComponent
