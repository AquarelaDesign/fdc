import axios from 'axios'

const token = localStorage.getItem('@fdc/token')

const api = axios.create({
  baseURL: 'http://168.194.69.79:3003',
  headers: { Authorization: token },
})

export default api
