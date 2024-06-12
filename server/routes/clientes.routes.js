const express = require('express')
const clientesRoutes = express.Router()

const {getClientes,insertCliente,updateCliente, DeleteUser,ClientesCargados} = require('../controllers/clientes.controllers.js')

clientesRoutes.get('/clientes',getClientes)

clientesRoutes.post('/insertCliente',insertCliente)

clientesRoutes.put('/updateCliente',updateCliente)

clientesRoutes.delete('/deleteUser',DeleteUser)
clientesRoutes.get('/cargados',ClientesCargados)


module.exports = clientesRoutes;
