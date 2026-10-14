const express = require("express");
const router = express.Router();

const db = require("../database");

const multer = require("multer");
const path = require("path");


// ======================================
// KONFIGURASI UPLOAD
// ======================================

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },


    filename:(req,file,cb)=>{

        const ext = path.extname(file.originalname);

        const nama =
            Date.now()
            +
            ext;


        cb(null,nama);

    }

});


const upload = multer({
    storage:storage
});




// ======================================
// GET SEMUA DOKUMEN
// GET /api/bukti
// ======================================

router.get("/",(req,res)=>{


const sql = `

SELECT

d.id,

d.opd_id,

o.nama_opd,

d.nama_file,

d.file_path,

d.status


FROM dokumen d


LEFT JOIN opd o

ON d.opd_id=o.id


ORDER BY d.id DESC


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






// ======================================
// DETAIL DOKUMEN
// GET /api/bukti/:id
// ======================================

router.get("/:id",(req,res)=>{


const id=req.params.id;



const sql=`

SELECT

d.id,

d.opd_id,

o.nama_opd,

d.nama_file,

d.file_path,

d.status


FROM dokumen d


LEFT JOIN opd o

ON d.opd_id=o.id


WHERE d.id=?


`;



db.query(

sql,

[id],

(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:err.message

});

}



if(result.length===0){

return res.status(404).json({

success:false,

message:"Dokumen tidak ditemukan"

});

}



res.json({

success:true,

data:result[0]

});


}


);


});








// ======================================
// UPLOAD DOKUMEN
// POST /api/bukti
// ======================================


router.post(

"/",

upload.single("file"),

(req,res)=>{


const {

opd_id,

nama_file


}=req.body;




if(!req.file){


return res.status(400).json({

success:false,

message:"File belum dipilih"

});


}




const file_path=req.file.filename;




const sql=`

INSERT INTO dokumen

(

opd_id,

nama_file,

file_path,

status

)


VALUES(?,?,?,?)

`;



db.query(

sql,

[

opd_id,

nama_file || req.file.originalname,

file_path,

"Menunggu"

],


(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:err.message

});

}




res.json({

success:true,

message:"Dokumen berhasil diupload",

id:result.insertId

});


}


);



}

);









// ======================================
// VERIFIKASI ADMIN
// PUT /api/bukti/verifikasi/:id
// ======================================


router.put(

"/verifikasi/:id",

(req,res)=>{


const id=req.params.id;


const {

status

}=req.body;



const sql=`

UPDATE dokumen

SET status=?

WHERE id=?

`;



db.query(

sql,

[

status,

id

],


(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:err.message

});

}



if(result.affectedRows===0){

return res.status(404).json({

success:false,

message:"Dokumen tidak ditemukan"

});

}



res.json({

success:true,

message:"Status dokumen berhasil diperbarui"

});


}


);



}

);








// ======================================
// HAPUS DOKUMEN
// DELETE /api/bukti/:id
// ======================================


router.delete(

"/:id",

(req,res)=>{


const id=req.params.id;



db.query(

`

DELETE FROM dokumen

WHERE id=?

`,

[id],


(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:err.message

});

}



res.json({

success:true,

message:"Dokumen berhasil dihapus"

});


}


);


}

);





module.exports = router;