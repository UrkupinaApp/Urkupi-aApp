const express = require('express')

const TicketRoutes = express.Router()

const {PostTicket,GetTickets, DineroGenerado, VerificarYActualizarTicket, GetTicketsCortesia, PostTicketCortesia} =require('../controllers/ticket.controllers.js')


TicketRoutes.get('/getTickets',GetTickets)
TicketRoutes.get("/getticketscortesia",GetTicketsCortesia)
TicketRoutes.post('/postTicket',PostTicket)
TicketRoutes.post("/ticketcortesia",PostTicketCortesia)
TicketRoutes.get('/calculoDinero',DineroGenerado)
TicketRoutes.post('/descargar',VerificarYActualizarTicket)


module.exports=TicketRoutes