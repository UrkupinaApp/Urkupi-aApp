const express = require('express');
const { insertVendedor } =require('../controllers/ambulantes.controllers')
const ambulantesRoute = express.Router();

// Ruta para registrar un vendedor ambulante
ambulantesRoute.post('/', insertVendedor);

module.exports = ambulantesRoute;
