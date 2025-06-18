const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  
  port: process.env.PORT || 3333,
  // Chave secreta usada para gerar o token JWT.
  jwtSecret: process.env.JWT_SECRET || 'insight-secret',

  // Tempo de expiração do token JWT
  jwtExpiresIn: '2h'
};
