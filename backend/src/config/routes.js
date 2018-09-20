const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    // Rotas de Servicos 
    const Pas = require('../api/fdc/pas/pasService')
    Pas.register(protectedApi, '/pas')

    const Usu = require('../api/fdc/usu/usuService')
    Usu.register(protectedApi, '/usu')

    const Vei = require('../api/fdc/vei/veiService')
    Vei.register(protectedApi, '/vei')

    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}