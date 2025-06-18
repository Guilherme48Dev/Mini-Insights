const { db, initializeDatabase } = require('./database/connection');
const app = require('./app');

const PORT = 3333;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Falha ao inicializar o banco:', err.message);
});
