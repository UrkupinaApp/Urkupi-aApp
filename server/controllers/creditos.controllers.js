const conctarDb = require('../database/database')


const cargaCredito = (req,res)=>{
    const {numero_tarjeta,creditos,user_id} = req.body

    let connect = conctarDb()
    connect.query('INSERT INTO creditos (numero_tarjeta, creditos, user_id) VALUES (?, ?, ?)',[numero_tarjeta,creditos,user_id],(err,resp)=>{
        if(err){
            res.send(err)
        }else{
            res.send('credito cargado correctamente')
        }

        connect.end()
    })
}

const updateCreditos = (req,res)=>{
    const {id,creditos,user_id} = req.body
    let connect = conctarDb()
    connect.query('UPDATE clientes SET   ')
}



module.exports = {cargaCredito}