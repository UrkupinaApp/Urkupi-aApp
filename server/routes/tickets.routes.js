const express = require('express')

const TicketRoutes = express.Router()

const {PostTicket,GetTickets, DineroGenerado} =require('../controllers/ticket.controllers.js')


TicketRoutes.get('/getTickets',GetTickets)
TicketRoutes.post('/postTicket',PostTicket)
TicketRoutes.get('/calculoDinero',DineroGenerado)
TicketRoutes.post('/descargar',(req,res)=>{
    res.send("prueba de tickets")
})


module.exports=TicketRoutes