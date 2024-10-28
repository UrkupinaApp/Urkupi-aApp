
const conectarDB = require("../database/database.js")


const PostTicket = (req,res)=>{
    const {N_ticket,dia,hora,qr_code,baño,caja,carga,precio} =req.body
    let connect = conectarDB()
    connect.query('INSERT INTO tickets (N_ticket,dia,hora,qr_code,baño,caja,carga,precio) VALUES (?, ?, ?, ?, ?, ?, ?,?)',[N_ticket,dia,hora,qr_code,baño,caja,carga,precio],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send("Ticket cargado correctamente")
        }
        connect.end()
    })
}
const GetTickets = (req,res)=>{
    let connect = conectarDB()
    connect.query('SELECT * FROM tickets',(e,data)=>{
       
        res.send(data)
        connect.end()
    })
}

const PostTicketCortesia = (req, res) => {
    const { N_ticket, dia, hora, qr_code, baño, caja, precio, carga } = req.body;

    // Validación de los datos de entrada
 /*    if (!N_ticket || !dia || !hora || !qr_code || !baño || !caja || precio === undefined) {
        console.error('Faltan campos en la solicitud:', req.body);
        return res.status(400).send({ message: "Faltan campos requeridos en la solicitud." });
    }
 */
    let connect;
    try {
        connect = conectarDB();
    } catch (connectionError) {
        console.error('Error al conectar a la base de datos:', connectionError);
        return res.status(500).send({ message: "Error al conectar a la base de datos.", error: connectionError });
    }

    // Definir el valor de 'carga' como true por defecto si no se proporciona en la solicitud
    const cargaValor = carga !== undefined ? carga : true;

    console.log(`Insertando ticket con N_ticket: ${N_ticket}, carga: ${cargaValor}`);

    // Inserción en la tabla ticketscortesia
    const insertQuery = `
        INSERT INTO ticketscortesia 
            (N_ticket, dia, hora, qr_code, baño, caja, carga, precio) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connect.query(
        insertQuery,
        [N_ticket, dia, hora, qr_code, baño, caja, cargaValor, precio],
        (err, result) => {
            if (err) {
                console.error('Error al insertar el ticket de cortesía:', err);
                console.log(err,"no se inserto")
                // Cierra la conexión antes de retornar
                connect.end();
                return res.status(500).send({ message: "Error al insertar el ticket de cortesía", error: err });
            } else {
                console.log('Ticket de cortesía insertado correctamente:', result);
                // Cierra la conexión antes de retornar
                connect.end();
                return res.status(200).send({ message: "Ticket de cortesía cargado correctamente" });
                console.log("se inserto correctamente el ticket cortesia...")
            }
        }
    );
};
 








const GetTicketsCortesia = (req, res) => {
  let connect = conectarDB();

  // Consulta para obtener todos los registros de la tabla 'ticketscortesia'
  connect.query('SELECT * FROM ticketscortesia', (err, data) => {
      if (err) {
          return res.status(500).json({ message: 'Error al consultar la tabla ticketscortesia', status: 500 });
      }

      // Enviar los datos obtenidos como respuesta
      res.status(200).json({
          message: 'Datos de ticketscortesia obtenidos exitosamente',
          status: 200,
          data
      });
      connect.end(); // Cierra la conexión
  });
};


/* const VerificarYActualizarTicket = (req, res) => {
  const { numero_ticket } = req.body;  // Asumiendo que el número de ticket se pasa como 'numero_ticket'
  let connect = conectarDB();

  // Buscar el ticket por número de ticket
  connect.query('SELECT carga FROM tickets WHERE N_ticket = ?', [numero_ticket], (err, results) => {
      if (err) {
          res.status(500).send(err);
          connect.end();
          return;
      }

      if (results.length > 0) {
          const carga = results[0].carga;

          // Verificar si carga es 'true'
          if (carga.toLowerCase() === 'TRUE') {
              // Actualizar carga a 'false'
              connect.query('UPDATE tickets SET carga = ? WHERE N_ticket = ?', ['FALSE', numero_ticket], (err, result) => {
                  if (err) {
                      res.status(500).send(err);
                  } else {
                      res.status(200).send("Ticket actualizado y autorizado correctamente.");
                  }
                  connect.end();
              });
          } else {
              res.status(500).send("No autorizado: carga es 'false'.");
              connect.end();
          }
      } else {
          res.status(404).send(`No se encontró un ticket con el número ${numero_ticket}.`);
          connect.end();
      }
  });
};
 */




/* const VerificarYActualizarTicket = (req, res) => {
    const { numero_ticket } = req.body;
    let connect = conectarDB();
  
    connect.query('SELECT carga FROM tickets WHERE N_ticket = ?', [numero_ticket], (err, results) => {
      if (err) {
        console.error(`Error al buscar el ticket: ${err}`);
        res.status(500).send(err);
        connect.end();
        return;
      }
  
      if (results.length > 0) {
        const carga = results[0].carga;
  
        if (carga.toLowerCase() === 'true') { // Asegúrate de comparar correctamente
          connect.query('UPDATE tickets SET carga = ? WHERE N_ticket = ?', ['false', numero_ticket], (err, result) => {
            if (err) {
              console.error(`Error al actualizar el ticket: ${err}`);
              res.status(500).send(err);
            } else {
              res.status(200).send("Ticket actualizado y autorizado correctamente.");
            }
            connect.end();
          });
        } else {
          console.error(`No autorizado: carga es '${carga}'`);
          res.status(403).send("No autorizado: carga es 'false'.");
          connect.end();
        }
      } else {
        console.error(`No se encontró un ticket con el número ${numero_ticket}.`);
        res.status(404).send(`No se encontró un ticket con el número ${numero_ticket}.`);
        connect.end();
      }
    });
  };

 */

/*   const VerificarYActualizarTicket = (req, res) => {
    const { numero_ticket } = req.body;
    let connect = conectarDB();
    console.log(numero_ticket)

    // Verifica si el ticket comienza con "Cortesia" o una letra mayúscula
    let tabla = "";
    if (numero_ticket.startsWith('Cortesia')) {
        tabla = "ticketscortesia";
    } else if (/^[A-Z]/.test(numero_ticket)) { // Comprueba si empieza con una letra mayúscula
        tabla = "tickets";
    } else {
        res.status(400).send("Formato de número de ticket no válido.");
        return;
    }
        console.log(tabla)
    // Consulta la tabla correspondiente
    connect.query(`SELECT carga FROM ${tabla} WHERE N_ticket = ?`, [numero_ticket], (err, results) => {
        if (err) {
            console.error(`Error al buscar el ticket en ${tabla}: ${err}`);
            console.log(err)
            res.status(500).send(err);
            connect.end();
            return;
        }

        if (results.length > 0) {
            const carga = results[0].carga;

            if (carga.toLowerCase() === 'true') { // Asegúrate de comparar correctamente
                connect.query(`UPDATE ${tabla} SET carga = ? WHERE N_ticket = ?`, ['false', numero_ticket], (err, result) => {
                    if (err) {
                        console.error(`Error al actualizar el ticket en ${tabla}: ${err}`);
                        res.status(500).send(err);
                    } else {
                        res.status(200).send("Ticket actualizado y autorizado correctamente.");
                    }
                    connect.end();
                });
            } else {
                console.error(`No autorizado: carga es '${carga}'`);
                res.status(403).send("No autorizado: carga es 'false'.");
                connect.end();
            }
        } else {
            console.error(`No se encontró un ticket con el número ${numero_ticket} en ${tabla}.`);
            res.status(404).send(`No se encontró un ticket con el número ${numero_ticket}.`);
            connect.end();
        }
    });
};
 */
  
/* 
*/


const VerificarYActualizarTicket = (req, res) => {
    let { numero_ticket } = req.body;

    // Log inicial para verificar la entrada
    console.log(`Solicitud recibida para verificar y actualizar el ticket: ${numero_ticket}`);

    // Validar el número de ticket
    if (!numero_ticket || typeof numero_ticket !== 'string') {
        console.error(`Número de ticket inválido: ${numero_ticket}`);
        return res.status(400).send("Número de ticket inválido.");
    }

    let connect;
    try {
        connect = conectarDB();
    } catch (connectionError) {
        console.error(`Error al conectar a la base de datos: ${connectionError}`);
        return res.status(500).send("Error al conectar a la base de datos.");
    }

    // Determinar la tabla a consultar
    const tabla = numero_ticket.startsWith('COR') ? "ticketscortesia" : "tickets";

    console.log(`Tabla seleccionada: ${tabla}`);

    // Consulta la tabla correspondiente
    const querySelect = `SELECT carga FROM ${tabla} WHERE N_ticket = ?`;
    console.log(`Ejecutando consulta: ${querySelect} con número de ticket: ${numero_ticket}`);

    connect.query(querySelect, [numero_ticket], (err, results) => {
        if (err) {
            console.error(`Error al buscar el ticket en ${tabla}: ${err}`);
            connect.end();
            return res.status(500).send("Error al buscar el ticket en la base de datos.");
        }
        console.log(results)
        if (results.length > 0) {
            // Convertir el valor de carga a booleano
            const carga = results[0].carga === 'TRUE'|| results[0].carga === '1';

            if (carga) {
                // Actualizar el valor de carga a 'false' en la base de datos
                const queryUpdate = `UPDATE ${tabla} SET carga = 'false' WHERE N_ticket = ?`;
                connect.query(queryUpdate, [numero_ticket], (err, result) => {
                    if (err) {
                        console.error(`Error al actualizar el ticket en ${tabla}: ${err}`);
                        connect.end();
                        return res.status(500).send("Error al actualizar el ticket en la base de datos.");
                    } else {
                        console.log(`Ticket autorizado y actualizado correctamente para el número de ticket: ${numero_ticket}`);
                        connect.end();
                        return res.status(200).send("Ticket autorizado correctamente.");
                    }
                });
            } else {
                console.warn(`Acceso denegado: carga es 'false' para el ticket ${numero_ticket}.`);
                connect.end();
                return res.status(403).send("No autorizado: carga no está en estado 'true'.");
            }
        } else {
            console.warn(`No se encontró un ticket con el número ${numero_ticket} en ${tabla}.`);
            connect.end();
            return res.status(404).send(`No se encontró un ticket con el número ${numero_ticket}.`);
        }
    });
};



const DineroGenerado =async(req,res)=>{

    try {
        // Establecer la conexión a la base de datos
        let connect = conectarDB();
    
        // Obtener todos los tickets de la base de datos
        connect.query("SELECT precio FROM tickets", (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Error al obtener los datos de los tickets." });
          } else {
            // Calcular el dinero total generado sumando los precios de los tickets
            const totalMoneyGenerated = data.reduce((total, ticket) => total + ticket.precio, 0);
    
            // Enviar el resultado como respuesta JSON
            res.json({ totalMoneyGenerated });
          }
    
          // Cerrar la conexión a la base de datos
          connect.end();
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al calcular el dinero generado." });
      }

}


module.exports ={PostTicket,GetTickets,DineroGenerado,VerificarYActualizarTicket,GetTicketsCortesia,PostTicketCortesia}