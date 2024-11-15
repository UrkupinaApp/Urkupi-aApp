const conectarDB = require("../database/database.js")

const path = require('path');
const fs = require('fs');


const insertVendedor = (req, res) => {
    let connect = conectarDB();
    //ambulantes App
    // Verificar que el archivo de imagen esté presente
    if (!req.files || !req.files.foto) {
        return res.status(400).send('No se ha subido ninguna imagen.');
    }
   
    const foto = req.files.foto;
    const { nombre, apellido, dni, fecha_alta } = req.body;

    // Crear un nombre de archivo único para la imagen
    const nombreArchivo = `foto_${dni}_${Date.now()}.png`;
    const rutaImagen = path.join(__dirname, '../uploads', nombreArchivo);

    // Mover el archivo a la carpeta 'uploads'
    foto.mv(rutaImagen, (err) => {
        if (err) {
            console.error('Error al mover la imagen:', err);
            return res.status(500).send('Error al guardar la imagen.');
        }

        // Insertar datos en la base de datos
        const query = 'INSERT INTO vendedores_ambulantes (nombre, apellido, dni, fecha_alta, foto_path) VALUES (?, ?, ?, ?, ?)';
        const fotoPath = `/uploads/${nombreArchivo}`;

        connect.query(query, [nombre, apellido, dni, fecha_alta, fotoPath], (err, result) => {
            if (err) {
                console.error('Error al insertar el vendedor:', err);
                return res.status(500).send('Error al insertar el vendedor');
            }
            res.send('Vendedor cargado con éxito');
            console.log("carga exitosa")
        });
    });
};


const getVendedores = (req, res) => {
    const connect = conectarDB();

    const query = 'SELECT * FROM vendedores_ambulantes';

    connect.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los vendedores:', err);
            return res.status(500).send('Error al obtener los vendedores.');
        }

        res.status(200).json(results);
    });
};


module.exports = { insertVendedor,getVendedores };
