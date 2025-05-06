
const conectarDB = require("../database/database.js")



const getClientes = (req,res)=>{
    let connect = conectarDB()
    connect.query('SELECT * FROM clientes',(e,data)=>{
       
        res.send(data)
    })
}

const insertCliente = (req,res)=>{
    let connect = conectarDB()
    const {fullname,telefono,mail,fila,puesto,metros,creditos,dni,numero_tarjeta,status} =req.body

    connect.query('INSERT INTO clientes (fullname,telefono,mail,fila,puesto,metros,creditos,dni,numero_tarjeta,status) VALUES (?,?,?,?,?,?,?,?,?)',[fullname,telefono,mail,fila,puesto,metros,creditos,dni,numero_tarjeta,status])
    res.send('cliente cargado con exito')
    connect.end()
   
}

/* const DeleteUser = (req, res) => {
    let connect = conectarDB(); // Asumiendo que conectarDB() devuelve una conexión válida

    const { fullname, dni } = req.body
    console.log(req.body)
    console.log(fullname,dni)

    connect.query('DELETE FROM clientes WHERE fullname = ? AND dni = ?', [fullname, dni], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la sentencia DELETE:', error);
            res.status(500).send('Error interno del servidor');
        } else {
            console.log('Registros eliminados:', results.affectedRows);
            res.status(200).send('Registros eliminados exitosamente');
        }
    });
};
 */


const DeleteUser = (req, res) => {
    let connect = conectarDB(); // Asumiendo que conectarDB() devuelve una conexión válida

    const { fullname, dni } = req.query;  // Cambiar req.body a req.query
    console.log(req.query);  // Imprimir los datos de la cadena de consulta para verificar

    connect.query('DELETE FROM clientes WHERE fullname = ? AND dni = ?', [fullname, dni], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la sentencia DELETE:', error);
            res.status(500).send('Error interno del servidor');
        } else {
            console.log('Registros eliminados:', results.affectedRows);
            res.status(200).send('Registros eliminados exitosamente');
        }
    });
};

const updateCliente = (req,res)=>{
    const {id,fullname,telefono,mail,fila,puesto,metros,creditos,numero_tarjeta} = req.body
    let connect = conectarDB()
    connect.query('UPDATE clientes SET fullname=?, telefono=?, mail=?, fila=?, puesto=?, metros=?, creditos=?, numero_tarjeta=? WHERE id=? ',[fullname,telefono,mail,fila,puesto,metros,creditos,numero_tarjeta,id])
    res.send('cliente modificado con exito')

    connect.end()
}


/* const ClientesCargados = async (req, res) => {
    try {
      // Establecer la conexión a la base de datos
      const connect = conectarDB();
  
      // Consultar la cantidad de clientes cargados (ejemplo con la tabla 'Clientes')
      const resultado = await connect.query('SELECT COUNT(*) as cantidad FROM clientes');
        console.log(resultado)
      // Extraer la cantidad de clientes del resultado
      const cantidadClientes = resultado[0].cantidad;
  
      // Enviar la cantidad de clientes como respuesta JSON
      res.json({ cantidadClientes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la cantidad de clientes cargados.' });
    }
  } */

  const ClientesCargados = async (req, res) => {
    try {
      // Establecer la conexión a la base de datos
      const connect = conectarDB();
  
      // Consultar la cantidad de clientes cargados (ejemplo con la tabla 'clientes')
      const resultado =  connect.query('SELECT COUNT(*) as cantidad FROM clientes',(err,result)=>{

            // Enviar la cantidad de clientes como respuesta JSON
            res.json({ "clietnes":result });
         
      });
   
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la cantidad de clientes cargados.' });
    }
  }
  
  


module.exports = {getClientes,insertCliente,updateCliente,DeleteUser,ClientesCargados}