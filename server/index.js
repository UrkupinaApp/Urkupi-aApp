const express = require('express')
const cors = require('cors')
const app = express()


//llamando a las rutas


const Authrouter = require('./routes/auth.routes.js')

const TicketRoutes = require('./routes/tickets.routes.js')

const clientesRoutes = require('./routes/clientes.routes.js')

const creditosRoute = require('./routes/creditos.routes.js')
const ambulantesRoute = require('./routes/ambulantes.routes.js')
const fileUpload = require('express-fileupload');


app.use(cors())
app.use(express.json())


app.use(fileUpload()); // Middleware para la carga de archivos
app.use(express.static('uploads'));

app.use("/auth",Authrouter)

app.use('/tickets',TicketRoutes)

app.use("/clientes",clientesRoutes)

app.use("/creditos",creditosRoute)

app.use("/api/venderores",ambulantesRoute)

app.listen(3002,'0.0.0.0',()=>{
    console.log('server upp....')
})