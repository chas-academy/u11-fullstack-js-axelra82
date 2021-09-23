import React from 'react'
import { useHistory } from 'react-router-dom'
import ArrowLeftIconComponent from '../icons/arrow-left'
import './style.scss'

const PreviousPageComponent = () => {
    const history = useHistory()

    const previousPage = () => {
        history.goBack()
    }
    return (
        <section id="previous-page">
            <button type="button" className="previous-page-button" onClick={previousPage}>
                <ArrowLeftIconComponent />
            </button>
        </section>
    )
}

export default PreviousPageComponent
