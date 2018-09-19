const express = require('express')

module.exports = function(server) {

    // Definir URL base para todas as rotas 
    const router = express.Router()
    server.use('/api', router)

    // Rotas de Servicos 
    const BillingCycle = require('../api/fdc/fdcService')
    BillingCycle.register(router, '/fdcs')
}