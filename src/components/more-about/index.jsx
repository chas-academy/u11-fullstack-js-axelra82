import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import StoreContext from '../../context/StoreContext'

const MoreAboutComponent = () => {
    const {
        store: { isAdmin },
    } = useContext(StoreContext)

    return (
        <small>
            <ul className="text-muted list-unstyled px-2 py-3 m-0">
                <li>
                    <Link to="/terms">Terms of service</Link>
                </li>
                <li>
                    <Link to="/integrity-policy">Integrity policy</Link>
                </li>
                <li>
                    <Link to="/cookie-policy">Cookie policy</Link>
                </li>
                {isAdmin && (
                    <li>
                        <Link to="/admin/panel">Admin</Link>
                    </li>
                )}
                <li className="border-top mt-2 pt-2">Twitter clone</li>
                <li>Assignment u11</li>
                <li>Chas Academy</li>
                <li>&copy; 2021 Axel Roussille Åberg</li>
            </ul>
        </small>
    )
}

export default MoreAboutComponent
