const express = require('express');
const { insertVendedor, getVendedores, editVendedor, deleteVendedor, insertReporte } =require('../controllers/ambulantes.controllers')
const ambulantesRoute = express.Router();

// Ruta para registrar un vendedor ambulante
ambulantesRoute.post('/', insertVendedor);
ambulantesRoute.post("/insertReporte",insertReporte)
ambulantesRoute.get("/get",getVendedores)
ambulantesRoute.put("/update/:id",editVendedor)
ambulantesRoute.delete("/delete/:id",deleteVendedor)

module.exports = ambulantesRoute;
