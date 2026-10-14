// ==================================================
// DATABASE CONNECTION
// IKPD ONLINE 2026
// MYSQL
// ==================================================

require("dotenv").config();

const mysql = require("mysql2");


const db = mysql.createPool({

    host: process.env.DB_HOST || "127.0.0.1",

    user: process.env.DB_USER || "root",

    password: process.env.DB_PASSWORD || "",

    database: process.env.DB_NAME || "ikpd_online",

    port: Number(process.env.DB_PORT || 3306),

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0,

    charset: "utf8mb4",

    timezone: "+07:00"

});


db.getConnection((err, connection)=>{

    if(err){

        console.log(
            "DATABASE CONNECTION ERROR:",
            err.message
        );

        return;

    }


    console.log(
        "MYSQL DATABASE CONNECTED"
    );


    connection.release();

});


module.exports = db;
