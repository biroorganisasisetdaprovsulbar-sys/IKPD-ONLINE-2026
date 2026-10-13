const express = require("express");
const router = express.Router();


const db = require("../database");



// ======================================
// SIMPAN PENILAIAN
// POST /api/penilaian
// ======================================


router.post("/",(req,res)=>{


const data = req.body;



if(!Array.isArray(data) || data.length===0){


return res.status(400).json({

success:false,

message:
"Data penilaian kosong"

});


}





const sql = `

INSERT INTO penilaian

(
opd_id,
indikator_id,
nilai_input,
nilai_bobot

)

VALUES ?

ON DUPLICATE KEY UPDATE


nilai_input =
VALUES(nilai_input),


nilai_bobot =
VALUES(nilai_bobot)


`;





const values = data.map(item=>[


item.opd_id,

item.indikator_id,

item.nilai_input,

item.nilai_bobot


]);





db.query(

sql,

[values],

(err,result)=>{


if(err){


console.log(err);



return res.status(500).json({

success:false,

message:
err.message

});


}






res.json({

success:true,

message:
"Penilaian berhasil disimpan",


jumlah:

result.affectedRows


});



}



);



});










// ======================================
// GET NILAI BERDASARKAN OPD
// GET /api/penilaian/:opd_id
// ======================================


router.get("/:opd_id",(req,res)=>{


const opd_id =
req.params.opd_id;



const sql = `


SELECT


p.id,


i.kode_indikator,


i.nama_indikator,


i.bobot,


p.nilai_input,


p.nilai_bobot



FROM penilaian p



JOIN indikator i

ON p.indikator_id=i.id



WHERE p.opd_id=?



ORDER BY i.id



`;





db.query(

sql,

[opd_id],

(err,result)=>{


if(err){


return res.status(500).json({

success:false,

message:
err.message

});


}



res.json({

success:true,

data:
result

});


}



);



});











// ======================================
// REKAP NILAI OPD
// GET /api/penilaian/rekap/:opd_id
// ======================================


router.get(

"/rekap/:opd_id",

(req,res)=>{



const opd_id =
req.params.opd_id;



const sql = `


SELECT


o.nama_opd,


ROUND(

SUM(p.nilai_bobot),

2

)

AS total_nilai



FROM opd o



JOIN penilaian p

ON o.id=p.opd_id



WHERE o.id=?



GROUP BY o.id



`;





db.query(

sql,

[opd_id],

(err,result)=>{


if(err){


return res.status(500).json({

success:false,

message:
err.message

});


}





res.json({

success:true,

data:

result[0] || {}

});



}



);



});







module.exports = router;