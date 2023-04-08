import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

connection.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados', err);
    } else {
      console.log('Conexão com o banco de dados estabelecida com sucesso');
    }
    });

export default connection;