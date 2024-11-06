const express = require('express')
const { insertVendedor } = require('../controllers/ambulantes.controllers')

const ambulantesRoute = express.Router()




ambulantesRoute.post('/postAmbulante',insertVendedor)






module.exports = ambulantesRoute;