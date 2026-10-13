const express = require("express");
const router = express.Router();

const db = require("../database");




// =====================================
// DASHBOARD SUMMARY
// =====================================

router.get("/",(req,res)=>{


const sql = `

SELECT


COUNT(*) AS total_opd,


ROUND(
AVG(total_nilai),
2
) AS rata_nilai,


ROUND(
MAX(total_nilai),
2
) AS tertinggi,


ROUND(
MIN(total_nilai),
2
) AS terendah



FROM

(

SELECT


opd.id,


COALESCE(

SUM(
penilaian.nilai_bobot
),

0

) AS total_nilai



FROM opd



LEFT JOIN penilaian


ON opd.id = penilaian.opd_id



GROUP BY opd.id



) AS hasil



`;




db.query(

sql,

(err,result)=>{


if(err){

console.log(
"Dashboard Summary Error:",
err
);


return res.status(500).json({

success:false,

message:
err.message

});


}




res.json({

success:true,


data:{


total_opd:
Number(
result[0].total_opd || 0
),



rata_nilai:
Number(
result[0].rata_nilai || 0
),



tertinggi:
Number(
result[0].tertinggi || 0
),



terendah:
Number(
result[0].terendah || 0
)



}


});



}


);



});









// =====================================
// GRAFIK NILAI OPD
// =====================================


router.get("/grafik",(req,res)=>{


const sql = `


SELECT


opd.nama_opd,


ROUND(

COALESCE(

SUM(
penilaian.nilai_bobot
),

0

),

2

)

AS nilai_akhir



FROM opd



LEFT JOIN penilaian


ON opd.id =
penilaian.opd_id



GROUP BY


opd.id,
opd.nama_opd



ORDER BY


nilai_akhir DESC



`;




db.query(

sql,

(err,result)=>{


if(err){


console.log(
"Grafik Error:",
err
);



return res.status(500).json({

success:false,

message:
err.message

});


}



res.json(result);



}


);



});









// =====================================
// STATUS EVALUASI
// =====================================


router.get("/status",(req,res)=>{


const sql = `


SELECT


CASE


WHEN total_nilai >= 80

THEN 'Sangat Baik'



WHEN total_nilai >= 70

THEN 'Baik'



ELSE 'Perlu Perbaikan'



END AS kategori,



COUNT(*) AS total



FROM

(


SELECT


opd.id,


COALESCE(

SUM(
penilaian.nilai_bobot
),

0

) AS total_nilai



FROM opd



LEFT JOIN penilaian


ON opd.id =
penilaian.opd_id



GROUP BY opd.id



) AS hasil



GROUP BY kategori



`;




db.query(

sql,

(err,result)=>{


if(err){


console.log(
"Status Error:",
err
);



return res.status(500).json({

success:false,

message:
err.message

});


}



res.json(result);



}


);



});







module.exports = router;