const express = require('express');
const { insertVendedor } = require('../controllers/ambulantesController.js');
const ambulantesRoute = express.Router();

// Ruta para registrar un vendedor ambulante
router.post('/', insertVendedor);

module.exports = ambulantesRoute;
