import React, { useState } from 'react'
import { API } from './API'

export const TestLesson3 = () => {
    const [pageToGet, setPageToGet] = useState(1)
    const [pageToUpdate, setPageToUpdate] = useState(1)
    const [textToCreate, setTextToCreate] = useState('')
    const [bodyToCreate, setBodyToCreate] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [postsData, setPostsData] = useState({
        userId: 1,
        id: 1,
        title: '',
        body: ''
    })

    const getServerSource = (pageToGet: number) => {
        setIsFetching(true)
        API.getPost(pageToGet)
            .then(response => response.data)
            .then(data => {
                setIsFetching(false)
                setShowResults(true)

                return setPostsData({
                    userId: data.userId,
                    id: data.id,
                    title: data.title,
                    body: data.body
                })
            })
    }

    const getAllServerSposts = () => {
        setIsFetching(true)
        API.getAllPosts()
            .then(response => response.data)
            .then(data => {
                setIsFetching(false)
                setShowResults(true)

                console.log(data)

                // return setPostsData({
                //     userId: data.userId,
                //     id: data.id,
                //     title: data.title,
                //     body: data.body
                // })
            })
    }

    const updateServerPostData = (pageToUpdate: number) => {
        setIsFetching(true)
        API.updatePost(pageToUpdate)
            .then(response => response.data)
            .then(data => {
                setIsFetching(false)
                setShowResults(true)

                console.log(data)

                // return setPostsData({
                //     userId: data.userId,
                //     id: data.id,
                //     title: data.title,
                //     body: data.body
                // })
            })
    }

    const createServerPostData = (textToCreate: string, bodyToCreate: string) => {
        setIsFetching(true)
        API.createPost(textToCreate, bodyToCreate)
            .then(response => response.data)
            .then(data => {
                setIsFetching(false)
                setShowResults(true)

                console.log(data)

                // return setPostsData({
                //     userId: data.userId,
                //     id: data.id,
                //     title: data.title,
                //     body: data.body
                // })
            })
    }

    return (
        <div>
            <h1>Promises</h1>
            <div>
                <h3>
                    <p>Get a source. Input POST number:</p>
                </h3>
                <input
                    type='number'
                    value={pageToGet}
                    onChange={e => setPageToGet(+e.currentTarget.value)}
                />
                <button onClick={() => getServerSource(pageToGet)}>Get a source</button>
                {isFetching && <div>Loading...</div>}
                {showResults && (
                    <div>
                        <div>
                            <b>USER_ID:</b> {postsData.userId}
                        </div>
                        <div>
                            <b>POST_ID:</b> {postsData.id}
                        </div>
                        <div>
                            <b>TITLE:</b> {postsData.title}
                        </div>
                        <div>
                            <b>BODY:</b> {postsData.body}
                        </div>
                    </div>
                )}
            </div>
           <hr/>
            <div>
                <h3>
                    <p>Get ALL posts</p>
                </h3>

                <button onClick={() => getAllServerSposts()}>Get all posts</button>
                {showResults && (
                    <div>
                        {/* <div><b>USER_ID:</b> {postsData.userId}</div>
                        <div><b>POST_ID:</b> {postsData.id}</div>
                        <div><b>TITLE:</b> {postsData.title}</div>
                        <div><b>BODY:</b> {postsData.body}</div> */}
                    </div>
                )}
            </div>
            <hr/>
            <div>
                <h3>
                    <p>Udate a post. Input POST number:</p>
                </h3>
                <input
                    type='number'
                    value={pageToUpdate}
                    onChange={e => setPageToUpdate(+e.currentTarget.value)}
                />
                <button onClick={() => updateServerPostData(pageToUpdate)}>
                    Update post
                </button>
                {isFetching && <div>Loading...</div>}
                {showResults && (
                    <div>
                        {/* <div><b>USER_ID:</b> {postsData.userId}</div>
                        <div><b>POST_ID:</b> {postsData.id}</div>
                        <div><b>TITLE:</b> {postsData.title}</div>
                        <div><b>BODY:</b> {postsData.body}</div> */}
                    </div>
                )}
            </div>
            <hr/>
            <div>
                <h3>
                    <p>Create a post. Input POST TITLE :</p>
                </h3>
                <input
                    type='text'
                    value={textToCreate}
                    onChange={e => setTextToCreate(e.currentTarget.value)}
                />
                <h3>
                    <p>Create a post. Input POST BODY :</p>
                </h3>
                <input
                    type='text'
                    value={bodyToCreate}
                    onChange={e => setBodyToCreate(e.currentTarget.value)}
                />
                <button onClick={() => createServerPostData(textToCreate, bodyToCreate)}>
                    Create post
                </button>
                {isFetching && <div>Loading...</div>}
                {showResults && (
                    <div>
                        {/* <div><b>USER_ID:</b> {postsData.userId}</div>
                        <div><b>POST_ID:</b> {postsData.id}</div>
                        <div><b>TITLE:</b> {postsData.title}</div>
                        <div><b>BODY:</b> {postsData.body}</div> */}
                    </div>
                )}
            </div>
        </div>
    )
}
