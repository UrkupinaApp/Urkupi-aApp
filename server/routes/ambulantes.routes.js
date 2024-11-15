const express = require('express');
const { insertVendedor, getVendedores, editVendedor, deleteVendedor } =require('../controllers/ambulantes.controllers')
const ambulantesRoute = express.Router();

// Ruta para registrar un vendedor ambulante
ambulantesRoute.post('/', insertVendedor);
ambulantesRoute.get("/get",getVendedores)
ambulantesRoute.put("/update/:id",editVendedor)
ambulantesRoute.delete("/delete/:id",deleteVendedor)

module.exports = ambulantesRoute;
