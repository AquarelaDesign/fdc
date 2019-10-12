
const express = require('express')
const bodyParser = require('body-parser')
const allowCors = require('./cors')
const queryParser = require('express-query-int')

const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

const port = 3003

server.listen(port, function() {
    console.log(`BACKEND está sendo executado na porta ${port}.`)
})

module.exports = server