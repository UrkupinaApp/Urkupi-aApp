const conectarDB = require("../database/database.js")


const bcrypt = require('bcryptjs')

//funcion que quenera el dia/mes/años/hora

const getCurrentDateTime =()=> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

//funcion que loguea al user e inserta la usersession dentro de la tabla usersession


const login = (req, res) => {
  const { username, password } = req.body;
  let connect = conectarDB();

  connect.query('SELECT * FROM users WHERE username=?', [username], (err, userdata) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos', status: 500 });
    }

    if (userdata.length === 0) {
      return res.status(400).json({ message: 'El usuario no existe', status: 400 });
    }

    const user = userdata[0];

    bcrypt.compare(password, user.password, (error, isMatch) => {
      
      if (error) {
        return res.status(500).json({ message: 'Error al comparar contraseñas', status: 500 });
      }

      if (isMatch) {
        connect.query('INSERT INTO usersession (user_id, username, date_login) VALUES (?,?,?)', [user.user_id, username, getCurrentDateTime()], (insertErr, result) => {
          if (insertErr) {
            console.log(insertErr)
            return res.status(500).json({ message: 'Error al insertar en sesión de usuario', status: 500 });
          }
          res.send({"message":userdata})
          //res.status(200).json({ message: 'Contraseña correcta', status: 200,'userData':userdata });
          
        });
      } else {
        res.status(400).json({ message: 'Contraseña incorrecta', status: 400 });
      }
    });
  });
};



//Funcion que registra los users
const register=(req,res)=>{

    const fechaActual = getCurrentDateTime();
    const {username,password,rol} = req.body
    const passHash =  bcrypt.hashSync(password,10)

    const nuevoUsuario = {
    username: username,
    password: passHash,
    rol: rol,
    dateCreated: fechaActual
  };
  
  // Consulta SQL para insertar un nuevo usuario
  const query = 'INSERT INTO users SET ?';
  
  let connect = conectarDB()
  // Ejecutar la consulta SQL
  connect.query(query, nuevoUsuario, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar usuario:', error);
      return;
    }
    console.log('Usuario insertado correctamente');
    res.send({"message":"usuario cargado correctamente",
    "status":200,})
  });
  
  // Cerrar la conexión después de realizar las consultas
  connect.end();


    

}

module.exports = {login,register}