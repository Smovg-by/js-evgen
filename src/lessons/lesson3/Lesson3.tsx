import React, { useState } from 'react'
import API from './API'
import './lesson_3'
import { Preloader } from './Preloader'
import styles from './Lesson3.module.css'

const Lesson3 = () => {
    const [searchName, setSearchName] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [searchResult, setSearchResult] = useState({ Search: [], totalResults: 0 , error: ''})
    const [error, setError] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)

    const searchFilm = () => {
        setIsFetching(true)
        API.searchFilmsByTitle(searchName, 1)
            .then(res => {
                // console.log(res.data)
                if (res.data.Response === 'True') {
                    setError(false)
                    setSearchResult({ Search: res.data.Search, totalResults: res.data.totalResults, error: '' })
                    setShowResults(true)
                } else {
                    setError(true)
                    setSearchResult({ Search: [], totalResults: 0, error: res.data.Error })
                    setShowResults(false)
                }
            })
            .catch(err => { console.log(err); setShowResults(false) })
        setError(true)
        setIsFetching(false)

    }

    const onPageChanged = (searchName: string, page: number) => {

        setCurrentPage(page)
        setIsFetching(true)
        API.searchFilmsByTitle(searchName, page)
            .then(res => {
                console.log(res.data)
                if (res.data.Response === 'True') {
                    setError(false)
                    setSearchResult({ Search: res.data.Search, totalResults: res.data.totalResults, error: '' })
                    setShowResults(true)
                } else {
                    setError(true)
                    setSearchResult(res.data.Error)
                    setShowResults(false)
                }
            })
            .catch(err => { console.log(err); setShowResults(false) })
        setError(true)
        setIsFetching(false)
    }

    let pagesCount = Math.ceil(searchResult.totalResults / 10)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <h1>Promises</h1>
            <div>
                <h3>
                    <p>Search by name:</p>
                </h3>
                <input
                    type='text'
                    value={searchName}
                    onChange={e => setSearchName(e.currentTarget.value)}
                />
                <button onClick={searchFilm}>Search</button>
                {pages.length > 1 ?
                    pages.map((page) => {
                        return <span onClick={() => { onPageChanged(searchName, page) }}
                            className={
                                currentPage === page ?
                                    styles.selectedPage
                                    : styles.notSelectedPage}>   {page}   </span>
                    }) : <div></div>
                }
                <div>
                    {showResults &&
                        searchResult.Search.map(item => (
                            <div>
                                <hr />
                                <div>{`TITLE: ${item['Title']}`}</div>
                                <div>{`YEAR: ${item['Year']}`}</div>
                                <div>{`TYPE: ${item['Type']}`}</div>
                                <div>{`ImdbID: ${item['imdbID']}`}</div>
                                <div>{item['Poster'] === 'N/A' ? 'POSTER: no poster' : <div>POSTER:<div><img src={item['Poster']} /></div></div>}</div>
                                <hr />
                            </div>
                        ))}
                    {error && JSON.stringify(searchResult.error)}
                </div>
                {isFetching && <Preloader />}
            </div>
        </div>
    )
}
export default Lesson3
