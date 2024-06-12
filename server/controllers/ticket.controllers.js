
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
    })
}

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


module.exports ={PostTicket,GetTickets,DineroGenerado}