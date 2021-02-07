import axios from 'axios'
import config from '../config'

const $host = axios.create({
  baseURL: config.API_URL,
})

const $authHost = axios.create({
  baseURL: config.API_URL,
})

const autoInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(autoInterceptor)

export { $host, $authHost }
