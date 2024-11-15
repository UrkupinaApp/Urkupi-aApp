const express = require('express');
const { insertVendedor } = require('../controllers/ambulantesController.js');
const ambulantesRoute = express.Router();

// Ruta para registrar un vendedor ambulante
ambulantesRoute.post('/', insertVendedor);

module.exports = ambulantesRoute;
