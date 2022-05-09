// 待讨论，是否需要把axios分离处理
// import axios from 'axios'

const http = axios.create({
  timeout: 10 * 1000,
  withCredentials: true,
})

export const setHeaders = (headers) => {
  Object.keys(headers).forEach((key => {
    const val = headers[key]
    if (val || val === 0) {
      http.defaults.headers.common[key] = val
    }
  }))
}

export default http
