const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

// Importar las rutas
const Authrouter = require('./routes/auth.routes.js');
const TicketRoutes = require('./routes/tickets.routes.js');
const clientesRoutes = require('./routes/clientes.routes.js');
const creditosRoute = require('./routes/creditos.routes.js');
const ambulantesRoute = require('./routes/ambulantes.routes.js');

const app = express();

// Configurar middlewares
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } })); // Límite de 100MB

// Configurar 'uploads' como carpeta estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar las rutas
app.use('/auth', Authrouter);
app.use('/tickets', TicketRoutes);
app.use('/clientes', clientesRoutes);
app.use('/creditos', creditosRoute);
app.use('/api/vendedores', ambulantesRoute);

// Ruta para subir imágenes
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }

    // Acceder al archivo subido (campo "image" en el formulario)
    const file = req.files.image;

    // Validar que el archivo sea una imagen
    if (!file.mimetype.startsWith('image/')) {
        return res.status(400).json({ message: 'El archivo debe ser una imagen.' });
    }

    // Generar la ruta donde se guardará el archivo
    const uploadPath = path.join(__dirname, 'uploads', file.name);

    // Mover el archivo a la carpeta 'uploads'
    file.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al subir la imagen.' });
        }

        res.status(200).json({ 
            message: 'Imagen subida exitosamente.',
            url: `/uploads/${file.name}` 
        });
    });
});

// Iniciar el servidor
app.listen(3002, '0.0.0.0', () => {
    console.log('Servidor ejecutándose en el puerto 3002...');
});
