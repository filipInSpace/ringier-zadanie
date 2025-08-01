const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: 'localhost', 
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     connectionLimit: 5
});

module.exports = pool;
