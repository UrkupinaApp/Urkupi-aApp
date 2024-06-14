const express = require('express')

const TicketRoutes = express.Router()

const {PostTicket,GetTickets, DineroGenerado, VerificarYActualizarTicket} =require('../controllers/ticket.controllers.js')


TicketRoutes.get('/getTickets',GetTickets)
TicketRoutes.post('/postTicket',PostTicket)
TicketRoutes.get('/calculoDinero',DineroGenerado)
TicketRoutes.post('/descargar',VerificarYActualizarTicket)


module.exports=TicketRoutes