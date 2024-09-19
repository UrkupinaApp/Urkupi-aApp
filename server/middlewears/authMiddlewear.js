const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization'); // Se espera el token en el header

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret_key'); // Decodificar el token con tu clave secreta
    req.user = decoded; // Coloca los datos del usuario en req.user
    next(); // Continúa con la siguiente función
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
