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
app.use(express.json({ limit: '50mb' })); // Middleware para parsear JSON con un límite de 50 MB
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Middleware para formularios
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 } // Límite de tamaño de archivo de 50 MB
}));
app.use(express.static('uploads'));

app.use("/auth",Authrouter)

app.use('/tickets',TicketRoutes)

app.use("/clientes",clientesRoutes)

app.use("/creditos",creditosRoute)

app.use("/api/venderores",ambulantesRoute)

app.listen(3002,'0.0.0.0',()=>{
    console.log('server upp....')
})