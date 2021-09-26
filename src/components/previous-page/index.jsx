import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import ArrowLeftIconComponent from '../icons/arrow-left'
import './style.scss'

const PreviousPageComponent = () => {
    const history = useHistory()
    const location = useLocation()

    const previousPage = () => {
        const { action } = history
        const { state } = location

        // check if we can pop or push
        // pop means there is nothing to push to
        // push means there is history for go back function
        // in both scenarios we reset state to avoid loops
        if (action === 'POP' || state === '404') {
            history.push('/', '')
        } else {
            location.state = ''
            history.goBack()
        }
    }
    return (
        <section id="previous-page">
            <Button
                variant="link"
                className="rounded-circle py-2 px-2 bg-light"
                onClick={previousPage}
            >
                <ArrowLeftIconComponent />
            </Button>
        </section>
    )
}

export default PreviousPageComponent
