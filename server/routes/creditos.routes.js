const express = require('express')

const creditosRoute = express.Router()

const {cargaCredito} = require('../controllers/creditos.controllers.js')


creditosRoute.post('/carga',cargaCredito)
creditosRoute.put('/update',(req,res)=>{res.send("puto el que carga")})


module.exports = creditosRoute;