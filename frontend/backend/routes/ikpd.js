const express=require("express");

const router=express.Router();

const db=require("../database");


const {

hitungIKPD,

kategoriIKPD

}=require("../services/ikpdCalculator");





router.get(

"/opd/:id",

async(req,res)=>{


try{


const [rows]=await db.query(`


SELECT

p.nilai,

i.nama_indikator,

i.bobot


FROM penilaian p


JOIN indikator i

ON p.indikator_id=i.id


WHERE p.opd_id=?



`,

[req.params.id]

);




const nilai=

hitungIKPD(rows);



res.json({

success:true,

nilai_ikpd:nilai,

kategori:

kategoriIKPD(nilai),

detail:rows


});


}

catch(err){


res.status(500).json({

success:false

});


}


});


module.exports=router;