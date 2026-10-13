const express = require("express");
const router = express.Router();

const db = require("../database");

const multer = require("multer");
const path = require("path");



// =================================
// KONFIGURASI UPLOAD FILE
// =================================


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },


    filename:(req,file,cb)=>{

        const namaFile =
        Date.now()
        +
        "-"
        +
        file.originalname;


        cb(null,namaFile);

    }


});



const upload = multer({

    storage:storage

});






// =================================
// GET SEMUA BUKTI
// =================================


router.get("/",(req,res)=>{


const sql = `

SELECT *

FROM bukti_dukung

ORDER BY id DESC

`;



db.query(sql,(err,result)=>{


    if(err){

        console.log(err);

        return res.status(500).json(err);

    }



    res.json(result);


});


});






// =================================
// DETAIL BUKTI
// =================================


router.get("/:id",(req,res)=>{


const id=req.params.id;



db.query(

`
SELECT *

FROM bukti_dukung

WHERE id=?

`,

[id],

(err,result)=>{


    if(err){

        return res.status(500).json(err);

    }



    res.json(result[0]);


});


});








// =================================
// UPLOAD BUKTI DUKUNG OPD
// =================================


router.post(
"/",
upload.single("file"),
(req,res)=>{


const {

opd,

indikator,

nama_dokumen,

catatan


}=req.body;



if(!req.file){


return res.status(400).json({

success:false,

message:"File belum dipilih"

});


}



const file_path =
req.file.filename;




const sql = `

INSERT INTO bukti_dukung

(
opd,
indikator,
nama_dokumen,
file_path,
status,
catatan

)

VALUES(?,?,?,?,?,?)

`;





db.query(

sql,

[

opd,

indikator,

nama_dokumen,

file_path,

"Menunggu",

catatan || null

],



(err)=>{


if(err){

console.log(err);

return res.status(500).json(err);

}




res.json({

success:true,

message:
"Bukti dukung berhasil dikirim"

});


}


);



}

);








// =================================
// VERIFIKASI ADMIN
// =================================


router.put(

"/verifikasi/:id",

(req,res)=>{


const id=req.params.id;


const {

status,

catatan


}=req.body;





// ambil data bukti

db.query(

`

SELECT *

FROM bukti_dukung

WHERE id=?

`,

[id],


(err,data)=>{


if(err){

return res.status(500).json(err);

}




if(data.length===0){


return res.status(404).json({

message:"Data tidak ditemukan"

});


}



const bukti=data[0];





// update status bukti


db.query(

`

UPDATE bukti_dukung

SET

status=?,

catatan=?

WHERE id=?

`,

[

status,

catatan,

id

],


(err)=>{


if(err){

return res.status(500).json(err);

}





// ============================
// JIKA DITERIMA
// BUAT NILAI AWAL
// ============================


if(status==="Diterima"){



db.query(

`

SELECT

opd.id AS opd_id,

indikator.id AS indikator_id


FROM opd,indikator


WHERE

opd.nama_opd=?

AND indikator.kode_indikator=?

`,

[

bukti.opd,

bukti.indikator

],


(err,result)=>{


if(err){

console.log(err);

return;

}



if(result.length>0){



db.query(



[

result[0].opd_id,

result[0].indikator_id

],


(err)=>{


if(err){

console.log(err);

}


}


);



}



}



);


}






// simpan riwayat jika tabel tersedia


db.query(

`

INSERT INTO riwayat_verifikasi

(
bukti_id,
status,
catatan
)

VALUES(?,?,?)

`,

[

id,

status,

catatan

],


(err)=>{


if(err){

console.log(
"Riwayat tidak tersimpan:",
err.message
);

}


}


);






res.json({

success:true,

message:
"Verifikasi berhasil"

});




}


);



}



);


}

);








// =================================
// HAPUS BUKTI
// =================================


router.delete("/:id",(req,res)=>{


const id=req.params.id;



db.query(

`

DELETE FROM bukti_dukung

WHERE id=?

`,

[id],


(err)=>{


if(err){

return res.status(500).json({

success:false,

message:"Gagal menghapus data"

});

}




res.json({

success:true,

message:
"Bukti berhasil dihapus"

});


}


);


});






module.exports = router;