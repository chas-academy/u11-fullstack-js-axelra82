/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import algoliasearch from 'algoliasearch/lite'
import { Spinner } from 'react-bootstrap'
import SearchIcon from '../icons/search'

const SearchComponent = () => {
    const appId = process.env.REACT_APP_ALGOLIA_APP_ID
    const apiKey = process.env.REACT_APP_ALGOLIA_API_KEY
    const searchClient = algoliasearch(appId, apiKey)
    const index = searchClient.initIndex('instant_search')

    const [isSearch, setIsSearch] = useState(false)
    const [hits, setHits] = useState([])
    const [hasContent, setHasContent] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // custom debounce hook
    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value)
        useEffect(() => {
            setIsSearch(true)
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)
            return () => {
                clearTimeout(handler)
            }
        }, [value, delay])
        return debouncedValue
    }
    const debouncedSearchTerm = useDebounce(searchTerm, 1000)

    const inputRef = useRef()

    const checkInput = () => {
        const { current } = inputRef
        if (current) {
            const { textContent } = current
            setSearchTerm(textContent)
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

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearch(false)
            setHasContent(true)
            ;(async () => {
                const result = await index.search(debouncedSearchTerm)
                setHits(result.hits)
            })()
        } else {
            setHits([])
            setIsSearch(false)
            setHasContent(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm])

    return (
        <>
            <div className="position-relative ms-2 mt-2 mb-2">
                <div className="position-relative border rounded-pill">
                    <div
                        className={`text-muted position-absolute ms-3 me-5 p-2 ${
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
                        className="ms-3 me-5 p-2 border-end"
                    />
                    <SearchIcon classes="position-absolute top-50 end-0 translate-middle-y me-3" />
                </div>
                {isSearch ? (
                    <div
                        className="position-absolute w-100 bg-white border rounded mt-1 p-3 text-muted"
                        style={{ zIndex: 99 }}
                    >
                        <Spinner variant="primary" animation="border" role="status" size="sm" />{' '}
                        looking
                    </div>
                ) : (
                    hasContent &&
                    hits.length > 0 && (
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
                    )
                )}
            </div>
        </>
    )
}

export default SearchComponent
