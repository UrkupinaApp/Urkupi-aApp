const express = require('express');
const path = require('path');
const multer = require('multer');
const { insertVendedor } = require('../controllers/ambulantes.controllers');

const ambulantesRoute = express.Router();

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Ruta relativa a la carpeta 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, `foto_${Date.now()}.png`); // Nombre de archivo único
    }
});

const upload = multer({ storage: storage });

// Ruta para cargar imágenes
ambulantesRoute.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        console.log("No se ha cargado ninguna imagen");
        return res.status(400).send({ success: false, message: 'No se ha cargado ninguna imagen.' });
    }
    console.log('Imagen cargada:', req.file.path);
    res.status(200).send({ success: true, filePath: `/uploads/${req.file.filename}` });
});

// Ruta para insertar datos del vendedor (puede combinarse con la carga de imagen)
ambulantesRoute.post('/postAmbulante', insertVendedor);

module.exports = ambulantesRoute;
