import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
  host:'localhost',
  port: 5432,
  user:'postgres',
  password:'artmar1311',
  database:'drivenCareDB'
});

connection.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados', err);
    } else {
      console.log('Conexão com o banco de dados estabelecida com sucesso');
    }
    });

export default connection;