const express = require('express');
const { insertVendedor, getVendedores } =require('../controllers/ambulantes.controllers')
const ambulantesRoute = express.Router();

// Ruta para registrar un vendedor ambulante
ambulantesRoute.post('/', insertVendedor);
ambulantesRoute.get("/get",getVendedores)

module.exports = ambulantesRoute;
