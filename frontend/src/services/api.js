import axios from 'axios'
import { getToken } from './auth'
import { getOficina, getEmail } from '../globais'

const api = axios.create({
  baseURL: 'http://168.194.69.79:3003',
  timeout: 5000,
})

api.interceptors.request.use(async config => {
  const token = getToken()
  const email = getEmail()
  const oficina = getOficina()

  const localIP = require('local-ip-url')
  const wIP = localIP('public') === '127.0.0.1' ? '192.168.50.138' : localIP('public')
  
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `${token}`;
  }

  config.params = {
    widtrans: `${oficina.codemp}|1|1|${email}`,
    wip: wIP,
    wseqaba: 0,
  }

  return config
})

export default api
