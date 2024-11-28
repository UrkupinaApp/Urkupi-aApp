const conectarDB = require("../database/database.js")

const path = require('path');
const fs = require('fs');


const insertVendedor = (req, res) => {
    let connect = conectarDB();

    // Verificar que el archivo de imagen esté presente
    if (!req.files || !req.files.foto) {
        return res.status(400).send('No se ha subido ninguna imagen.');
    }
   
    const foto = req.files.foto;
    const { nombre, apellido, dni, local, fecha_alta, numero_chaleco, producto } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!nombre || !apellido || !dni || !local || !fecha_alta || !numero_chaleco || !producto) {
        return res.status(400).send('Faltan datos obligatorios para el registro.');
    }

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
        const query = `
            INSERT INTO vendedores_ambulantes 
            (nombre, apellido, dni, local, fecha_alta, numero_chaleco, producto, foto_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const fotoPath = `/uploads/${nombreArchivo}`;

        connect.query(query, [nombre, apellido, dni, local, fecha_alta, numero_chaleco, producto, fotoPath], (err, result) => {
            if (err) {
                console.error('Error al insertar el vendedor:', err);
                return res.status(500).send('Error al insertar el vendedor.');
            }
            res.send('Vendedor cargado con éxito');
            console.log('Carga exitosa');
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


// Función para editar un vendedor
const editVendedor = (req, res) => {
    const connect = conectarDB();
    const { id } = req.params;
    const { nombre, apellido, dni, fecha_alta } = req.body;

    const query = `UPDATE vendedores_ambulantes SET nombre = ?, apellido = ?, dni = ?, fecha_alta = ? WHERE id = ?`;
    connect.query(query, [nombre, apellido, dni, fecha_alta, id], (err, result) => {
        if (err) {
            console.error('Error al editar el vendedor:', err);
            return res.status(500).send('Error al editar el vendedor.');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Vendedor no encontrado.');
        }
        res.send('Vendedor actualizado correctamente');
    });
};

// Función para eliminar un vendedor
const deleteVendedor = (req, res) => {
    const connect = conectarDB();
    const { id } = req.params;

    const query = `DELETE FROM vendedores_ambulantes WHERE id = ?`;
    connect.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el vendedor:', err);
            return res.status(500).send('Error al eliminar el vendedor.');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Vendedor no encontrado.');
        }
        res.send('Vendedor eliminado correctamente');
    });
};

const insertReporte = (req, res) => {
    let connect = conectarDB();

    const { id_vendedor, nombre, apellido, reporte } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!id_vendedor || !nombre || !apellido || !reporte) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Insertar datos en la base de datos
    const query = `INSERT INTO reportes_vendedores (id_vendedor, nombre, apellido, reporte) 
                   VALUES (?, ?, ?, ?)`;

    connect.query(query, [id_vendedor, nombre, apellido, reporte], (err, result) => {
        if (err) {
            console.error('Error al insertar el reporte:', err);
            return res.status(500).send('Error al insertar el reporte');
        }
        res.send('Reporte cargado con éxito');
        console.log('Carga exitosa del reporte');
    });
};



module.exports = { insertVendedor,getVendedores,editVendedor,deleteVendedor,insertReporte };
