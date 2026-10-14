const mysql = require("mysql2/promise");


const db = mysql.createPool({

    host:"localhost",

    user:"root",

    password:"",

    database:"ikpd_online_2026",

    waitForConnections:true,

    connectionLimit:10,

    queueLimit:0

});



module.exports = db;