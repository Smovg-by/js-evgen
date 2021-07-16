import axios from 'axios'

const configJSONPlaceholder = {
  baseURL: 'https://jsonplaceholder.typicode.com/'
}

const axiosInstance = axios.create(configJSONPlaceholder)

export const API = {

  getPost: (postId: number) => {
    const query = `posts/${postId}`
    return axiosInstance.get(query)
  },

  getAllPosts: () => {
    const query = `posts`
    return axiosInstance.get(query)
  },

  updatePost: (postId: number) => {
    const query = `posts/${postId}`
    return axios({
      method: 'put',
      url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
      data: JSON.stringify({
        id: postId,
        title: 'Hello',
        body: 'Server',
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  },

  createPost: (textToCreate: string, bodyToCreate: string) => {
    return axios({
      method: 'post',
      url: `https://jsonplaceholder.typicode.com/posts`,
      data: JSON.stringify({
        // id: postId,
        title: `${textToCreate}`,
        body: `${bodyToCreate}`,
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  },
}
