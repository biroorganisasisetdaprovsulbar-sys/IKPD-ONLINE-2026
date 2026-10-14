const express = require("express");
const router = express.Router();

const db = require("../database");


// ===============================
// SUMMARY DASHBOARD
// GET /api/dashboard
// ===============================

router.get("/",(req,res)=>{


const sql=`

SELECT

COUNT(*) AS total_opd,

ROUND(AVG(nilai_total),2) AS rata_nilai,

MAX(nilai_total) AS tertinggi,

MIN(nilai_total) AS terendah


FROM opd


`;


db.query(sql,(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:err.message

});

}


res.json({

success:true,

data:result[0]

});


});


});




// ===============================
// RANKING OPD
// GET /api/dashboard/grafik
// ===============================


router.get("/grafik",(req,res)=>{


const sql=`

SELECT

nama_opd,

nilai_total AS nilai_akhir,

kategori


FROM opd


ORDER BY nilai_total DESC


`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


});


});




// ===============================
// STATUS EVALUASI
// GET /api/dashboard/status
// ===============================


router.get("/status",(req,res)=>{


const sql=`

SELECT

kategori,

COUNT(*) AS total


FROM opd


GROUP BY kategori


`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


});


});



module.exports=router;
