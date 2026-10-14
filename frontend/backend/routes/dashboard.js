const express = require("express");
const router = express.Router();

const db = require("../database");



// =====================================
// SUMMARY DASHBOARD
// GET /api/dashboard
// =====================================

router.get("/",(req,res)=>{


const sql = `

SELECT


COUNT(DISTINCT o.id) AS total_opd,


ROUND(
AVG(x.nilai_akhir),
2
) AS rata_nilai,


MAX(x.nilai_akhir) AS tertinggi,


MIN(x.nilai_akhir) AS terendah



FROM opd o



LEFT JOIN

(

SELECT

opd_id,

ROUND(
SUM(nilai_bobot),
2
) AS nilai_akhir


FROM penilaian


GROUP BY opd_id


HAVING SUM(nilai_bobot) > 0


)

x


ON o.id=x.opd_id



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






// =====================================
// RANKING OPD
// GET /api/dashboard/grafik
// =====================================


router.get("/grafik",(req,res)=>{


const sql=`

SELECT


o.nama_opd,


ROUND(
COALESCE(
SUM(p.nilai_bobot),
0
),
2
)

AS nilai_akhir



FROM opd o



LEFT JOIN penilaian p

ON o.id=p.opd_id



GROUP BY

o.id,
o.nama_opd



ORDER BY

nilai_akhir DESC


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

data:result

});


});


});






// =====================================
// STATUS EVALUASI
// =====================================


router.get("/status",(req,res)=>{


const sql=`

SELECT


CASE


WHEN nilai >=80

THEN 'Sangat Baik'


WHEN nilai >=70

THEN 'Baik'


WHEN nilai >0

THEN 'Perlu Perbaikan'


ELSE

'Belum Evaluasi'


END

AS kategori,

COUNT(*) total



FROM


(

SELECT


o.id,


COALESCE(
SUM(p.nilai_bobot),
0
)

nilai



FROM opd o


LEFT JOIN penilaian p

ON o.id=p.opd_id


GROUP BY o.id


)

x



GROUP BY kategori



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

data:result

});


});


});





module.exports=router;
