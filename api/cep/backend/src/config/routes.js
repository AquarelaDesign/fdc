const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/v01', protectedApi)

    protectedApi.use(auth)

    // Rotas de Servicos 
    const Busca = require('../api/fdc/servico')
    const Wfcpas = require('../api/fdc/wfcpas')
    
    protectedApi.post('/busca', Busca.servico)
    protectedApi.post('/wfcpas', Wfcpas.ResumoEtiquetas)
    
    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    const cepApi = express.Router()
    server.use('/api', cepApi)

    const cepService = require('../api/cep/cepService')
    cepService.post('/cep', cepApi.CEP)
    //cepService.register(cepApi, '/cep')
}