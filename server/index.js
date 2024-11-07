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
app.use(express.json({ limit: '100mb' })); // Aumentar el límite a 100 MB o lo que necesites
app.use(express.urlencoded({ limit: '100mb', extended: true })); // Aumentar el límite a 100 MB

app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 } // Limitar el tamaño de los archivos a 100 MB
}));
app.use(express.static('uploads'));


app.use("/auth",Authrouter)

app.use('/tickets',TicketRoutes)

app.use("/clientes",clientesRoutes)

app.use("/creditos",creditosRoute)

app.use("/api/vendedores",ambulantesRoute)

app.listen(3002,'0.0.0.0',()=>{
    console.log('server upp....')
})