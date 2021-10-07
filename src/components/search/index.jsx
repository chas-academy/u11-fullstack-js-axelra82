import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

const SearchComponent = () => {
    return (
        <>
            <InputGroup className="m-2">
                <FormControl className="rounded-pill" placeholder="search" aria-label="search" />
            </InputGroup>
        </>
    )
}

export default SearchComponent
