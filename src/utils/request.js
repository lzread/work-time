import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: "http://api.qishou.com.cn/Appservice/",
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  })

export default service
