import axios from 'axios'

const api = axios.create({
   baseURL: 'http://168.194.69.79:3003',
})

export default api