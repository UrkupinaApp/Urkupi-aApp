const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');

// Importar las rutas
const Authrouter = require('./routes/auth.routes.js');
const TicketRoutes = require('./routes/tickets.routes.js');
const clientesRoutes = require('./routes/clientes.routes.js');
const creditosRoute = require('./routes/creditos.routes.js');
const ambulantesRoute = require('./routes/ambulantes.routes.js');

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } }));

// Configurar 'uploads' como carpeta estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar las rutas
app.use("/auth", Authrouter);
app.use('/tickets', TicketRoutes);
app.use("/clientes", clientesRoutes);
app.use("/creditos", creditosRoute);
app.use("/api/vendedores", ambulantesRoute);

app.listen(3002, '0.0.0.0', () => {
    console.log('server up and running...');
});
