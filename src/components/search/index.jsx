/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import algoliasearch from 'algoliasearch/lite'
import SearchIcon from '../icons/search'

const SearchComponent = () => {
    const appId = process.env.REACT_APP_ALGOLIA_APP_ID
    const apiKey = process.env.REACT_APP_ALGOLIA_API_KEY
    const searchClient = algoliasearch(appId, apiKey)
    const index = searchClient.initIndex('instant_search')
    const [hasContent, setHasContent] = useState(false)
    const [hits, setHits] = useState([])

    const inputRef = useRef()

    const search = async (string) => {
        const result = await index.search(string)
        setHits(result.hits)
    }

    const checkInput = () => {
        const { current } = inputRef
        if (current) {
            const { textContent } = current
            search(textContent)
            return textContent
        }
        return false
    }

    const handleInputChange = () => {
        const input = checkInput()
        if (!hasContent) {
            setHasContent(true)
        }
        if (!input) {
            setHasContent(false)
        }
    }

    return (
        <>
            <div className="position-relative ms-2 mt-2 mb-2">
                <div className="position-relative border rounded-pill p-2">
                    <div
                        className={`text-muted position-absolute ms-2 ${
                            hasContent ? 'd-none' : ''
                        }`}
                    >
                        Search username
                    </div>
                    <div
                        contentEditable
                        ref={inputRef}
                        role="textbox"
                        tabIndex={0}
                        onSelect={handleInputChange}
                        onBlur={handleInputChange}
                        onFocus={handleInputChange}
                    />
                    <SearchIcon classes="position-absolute top-50 end-0 translate-middle-y me-3" />
                </div>
                {hasContent && hits.length > 0 && (
                    <div
                        className="position-absolute w-100 bg-white border rounded mt-1 p-3"
                        style={{ zIndex: 99 }}
                    >
                        {hits.map((hit) => {
                            const { objectID, username } = hit
                            return (
                                <div key={`search-hit-${objectID}`}>
                                    <Link to={`/${username}`}>@{username}</Link>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchComponent
