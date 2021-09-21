import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const RightComponent = () => {
    return (
        <>
            <ul className="right-panel-legal text-muted">
                <li>
                    <Link to="/user-agreement">User agreement</Link>
                </li>
                <li>
                    <Link to="/integrity-policy">Integrity policy</Link>
                </li>
                <li>
                    <Link to="/cookie-policy">Cookie policy</Link>
                </li>
                <li className="text-break">Twitter clone</li>
                <li>Assignment u11</li>
                <li>Chas Academy</li>
                <li>&copy; 2021 Axel Roussille Åberg</li>
            </ul>
        </>
    )
}

export default RightComponent
