const mysql = require('mysql')

function conectarDB() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'urkupinaapp2024',
    database: 'urkupina'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    //console.log('Conexión a la base de datos establecida');
  });

  return connection;
}

module.exports = conectarDB;