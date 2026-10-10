const express = require("express");
const router = express.Router();
const db = require("../database");



router.get("/",(req,res)=>{


const sql = `

SELECT

COUNT(*) AS total,

SUM(status='Menunggu') AS menunggu,

SUM(status='Diterima') AS diterima,

SUM(status='Ditolak') AS ditolak


FROM bukti_dukung

`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json(err);

}



res.json(result[0]);


});


});



module.exports = router;