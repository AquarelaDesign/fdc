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
    const Busca = require('../api/fdc/servico')
    const Wfcpas = require('../api/fdc/wfcpas')
    
    protectedApi.post('/busca', Busca.servico)
    protectedApi.post('/wfcpas', Wfcpas.ResumoEtiquetas)
    
    
    //const Pas = require('../api/fdc/pas/pasService')
    //const Fccau = require('../api/fdc/fccau/fccauService')
    //const Fcusu = require('../api/fdc/fcusu/fcusuService')
    //const Vei = require('../api/fdc/vei/veiService')

    //Wfcpas.register(protectedApi, '/wfcpas')
    //Fccau.register(protectedApi, '/fccau')
    //Fcusu.register(protectedApi, '/fcusu')
    //Vei.register(protectedApi, '/vei')

    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    // Rotas de Teste
    //const Pass = require('../api/fdc/pas/pasService')
    //const Fccaus = require('../api/fdc/fccau/fccauService')
    //const Fcusus = require('../api/fdc/fcusu/fcusuService')
    //const Veis = require('../api/fdc/vei/veiService')
    
    //Pass.register(openApi, '/pass')
    //Fccaus.register(openApi, '/fccaus')
    //Fcusus.register(openApi, '/fcusus')
    //Veis.register(openApi, '/veis')


}