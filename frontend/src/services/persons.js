import axios from 'axios'

// const baseURL = 'http://localhost:3001/api/persons'
const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    // axios.put(`${baseURL}/${id}`, newObject)
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseURL}/${id}`)
}

export default {
    getAll, create, update, remove
}