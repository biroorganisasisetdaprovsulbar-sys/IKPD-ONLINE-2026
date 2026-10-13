const db =
require("../config/database");






exports.getBukti =

(req,res)=>{


db.query(

`

SELECT

bukti_dukung.*,

opd.nama_opd,

indikator.nama_indikator


FROM bukti_dukung


LEFT JOIN opd

ON bukti_dukung.opd_id = opd.id



LEFT JOIN indikator

ON bukti_dukung.indikator_id = indikator.id



ORDER BY bukti_dukung.id DESC


`,

(err,result)=>{


if(err)

return res.status(500)

.json({

success:false,

message:err.message

});




res.json({

success:true,

data:result

});



}


);


};









exports.uploadBukti =

(req,res)=>{


const {


opd_id,

indikator_id,

keterangan


}

=
req.body;




const file =

req.file;




if(!file){


return res.status(400)

.json({

success:false,

message:

"File belum dipilih"

});


}






db.query(

`

INSERT INTO bukti_dukung

(

opd_id,

indikator_id,

nama_file,

path_file,

keterangan,

uploader

)


VALUES(?,?,?,?,?,?)

`,

[


opd_id,


indikator_id,


file.originalname,


file.path,


keterangan,


req.user.id


],



(err)=>{


if(err)

return res.status(500)

.json({

success:false,

message:err.message

});





res.json({

success:true,

message:

"Bukti berhasil diupload"

});


}


);



};









exports.deleteBukti =

(req,res)=>{


db.query(

`

DELETE FROM bukti_dukung

WHERE id=?

`,

[req.params.id],



()=>{


res.json({

success:true,

message:

"Dokumen dihapus"

});


}


);



};