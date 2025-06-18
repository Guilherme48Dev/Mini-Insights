const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const schemaPath = path.resolve(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath);

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(schemaPath, 'utf-8', (err, schema) => {
      if (err) {
        console.error('❌ Erro ao ler schema.sql:', err.message);
        return reject(err);
      }

      db.exec(schema, (err) => {
        if (err) {
          console.error('❌ Erro ao aplicar schema.sql:', err.message);
          return reject(err);
        } else {
          console.log('✅ Schema aplicado com sucesso!'); 
          console.log('📂 Caminho do banco carregado:', dbPath);
          resolve();
        }
      });
    });
  });
};

module.exports = { db, initializeDatabase };
