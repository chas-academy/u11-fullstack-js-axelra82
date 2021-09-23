import React from 'react'
import { useHistory } from 'react-router-dom'
import ArrowLeftIconComponent from '../icons/arrow-left'
import './style.scss'

// eslint-disable-next-line react/prop-types
const PreviousPageComponent = ({ classes = '' }) => {
    const history = useHistory()

    const previousPage = () => {
        history.goBack()
    }
    return (
        <section className={`previous-page ${classes}`}>
            <button type="button" className="previous-page-button" onClick={previousPage}>
                <ArrowLeftIconComponent />
            </button>
        </section>
    )
}

export default PreviousPageComponent
