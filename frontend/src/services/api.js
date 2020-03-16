import axios from 'axios'
import { getToken } from './auth'
import { getEmail } from '../globais'

const localIP = require('local-ip-url')

const baseURL = localIP('public') === '127.0.0.1' ? localIP('public') : '168.194.69.79'
const htprot = window.location.protocol !== 'https:' ? 'http' : 'https'
const htport = window.location.protocol !== 'https:' ? 3003 : 3004

const api = axios.create({
  baseURL: `${htprot}://${baseURL}:${htport}`,
  timeout: 5000,
})

api.interceptors.request.use(async config => {
  const token = getToken()
  const email = getEmail()
  
  let oficina = ''
  let codemp = ''
  
  if (localStorage.getItem('@fdc/oficina')) {
    oficina = JSON.parse(localStorage.getItem('@fdc/oficina'))
    codemp = oficina.codemp
  }

  const wIP = localIP('public') === '127.0.0.1' ? '192.168.50.138' : localIP('public')
  
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `${token}`;
  }

  config.params = {
    widtrans: `${codemp}|1|1|${email}`,
    wip: wIP,
    wseqaba: 0,
  }
  
  console.log('config', config)

  return config
})

export default api
