import axios from 'axios'
import { getToken } from './cookies'

// create singleton for axios
const service = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  mode: 'cors',
  credentials: 'same-origin'
})

service.interceptors.request.use(async config => {
  if (!config.public) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config
})

// response interceptor
service.interceptors.response.use(
  res => {
    return res
  },
  async error => {
    console.log(error)
    return Promise.reject(error.response)
  }
)

export default service
