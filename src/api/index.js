import axios from 'axios'
import { apiMap } from './map'

const SUCCESS_CODES = [200]
const instance = axios.create({
  baseURL: 'http://localhost:7003/'
})

instance.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
)

const createApi = (apiId, options, ohterConfig = {}) => {
  const { url, method, ...apiConfig } = apiMap[apiId]
  let promise
  if (['get', 'delete', 'head'].includes(method)) {
    const config = Object.assign({}, apiConfig, options)
    promise = instance[method](url, config)
  } else if (['post', 'put', 'patch'].includes(method)) {
    const config = Object.assign({}, apiConfig, ohterConfig)
    const data = options
    promise = instance[method](url, data, config)
  }
  return promise.then(({ code, message, data }) => {
    if (SUCCESS_CODES.includes(code)) {
      return data
    }
    return Promise.reject({ message, data })
  })
}

export default createApi
