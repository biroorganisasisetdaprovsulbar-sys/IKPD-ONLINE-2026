const express = require("express");
const router = express.Router();

const db = require("../database");


router.get("/",(req,res)=>{


const sql = `

SELECT

o.nama_opd,

ROUND(AVG(p.nilai_input),2) AS nilai_akhir,


CASE

WHEN AVG(p.nilai_input)>=80
THEN 'Sangat Baik'


WHEN AVG(p.nilai_input)>=70
THEN 'Baik'


ELSE 'Perlu Perbaikan'


END AS kategori


FROM opd o


LEFT JOIN penilaian p

ON o.id=p.opd_id


GROUP BY o.id,o.nama_opd


ORDER BY nilai_akhir DESC


`;


db.query(sql,(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:err.message

});

}


res.json(result);


});


});


module.exports=router;