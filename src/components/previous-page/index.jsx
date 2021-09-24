import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import ArrowLeftIconComponent from '../icons/arrow-left'
import './style.scss'

const PreviousPageComponent = () => {
    const history = useHistory()

    const previousPage = () => {
        const { action } = history

        // check if we can pop or push
        // pop means there is nothing to push to
        // push means there is history for go back function
        if (action === 'POP') {
            history.push('/')
        } else {
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
