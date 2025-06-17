const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'insight-secret',
  jwtExpiresIn: '2h'
};
