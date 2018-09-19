const express = require('express')

module.exports = function(server) {

    // Definir URL base para todas as rotas 
    const router = express.Router()
    server.use('/api', router)

    // Rotas de Servicos 
    const FDC = require('../api/fdc/fdcService')
    FDC.register(router, '/fdcs')
}