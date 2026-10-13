const mysql = require("mysql2");


const connection = mysql.createPool({

host:
process.env.DB_HOST || "localhost",


user:
process.env.DB_USER || "root",


password:
process.env.DB_PASSWORD || "",


database:
process.env.DB_NAME || "ikpd_online_2026",


connectionLimit:10

});



module.exports = connection;