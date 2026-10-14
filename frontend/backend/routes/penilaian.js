const express = require("express");
const router = express.Router();

const db = require("../database");



// ======================================
// SIMPAN PENILAIAN OTOMATIS HITUNG BOBOT
// POST /api/penilaian
// ======================================

router.post("/", async (req,res)=>{


const data = req.body;


if(!Array.isArray(data) || data.length===0){

return res.status(400).json({

success:false,

message:"Data penilaian kosong"

});

}



try{


let values=[];



for(const item of data){



const indikator = await new Promise(
(resolve,reject)=>{


db.query(

"SELECT bobot FROM indikator WHERE id=?",

[item.indikator_id],

(err,result)=>{


if(err){

reject(err);

}

else{

resolve(result[0]);

}


}


);


}

);



if(!indikator){

return res.status(400).json({

success:false,

message:
"Indikator tidak ditemukan"

});

}



const nilai_bobot =

Number(item.nilai_input) *

Number(indikator.bobot) / 100;



values.push([

item.opd_id,

item.indikator_id,

item.nilai_input,

nilai_bobot,

item.nilai_input,

item.catatan || "",

item.bukti_dukung || "",

item.status || "Draft"

]);



}




const sql = `

INSERT INTO penilaian

(
opd_id,
indikator_id,
nilai_input,
nilai_bobot,
nilai,
catatan,
bukti_dukung,
status
)

VALUES ?

ON DUPLICATE KEY UPDATE


nilai_input =
VALUES(nilai_input),


nilai_bobot =
VALUES(nilai_bobot),

nilai =
VALUES(nilai),

catatan =
VALUES(catatan),

bukti_dukung =
VALUES(bukti_dukung),

status =
VALUES(status)


`;




db.query(

sql,

[values],

(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:err.message

});


}



res.json({

success:true,

message:
"Penilaian berhasil dihitung dan disimpan",

jumlah:
result.affectedRows


});


}


);



}

catch(err){


res.status(500).json({

success:false,

message:err.message

});


}


});







// ======================================
// GET NILAI BERDASARKAN OPD
// ======================================


router.get("/:opd_id",(req,res)=>{


const opd_id=req.params.opd_id;



const sql=`

SELECT

p.id,

i.id AS indikator_id,

i.kode_indikator,

i.nama_indikator,

i.bobot,

p.nilai_input,

p.nilai_bobot,

p.nilai,

p.catatan,

p.bukti_dukung,

p.status


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

message:err.message

});

}



res.json({

success:true,

data:result

});


}


);


});








// ======================================
// REKAP NILAI OPD
// GET /api/penilaian/rekap/:opd_id
// ======================================

router.get("/rekap/:opd_id",(req,res)=>{


const opd_id = req.params.opd_id;


const sql = `

SELECT

o.nama_opd,

ROUND(SUM(p.nilai_bobot),2) AS total_nilai


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

message:err.message

});

}



res.json({

success:true,

data:result[0] || {}

});


}

);


});



module.exports = router;
