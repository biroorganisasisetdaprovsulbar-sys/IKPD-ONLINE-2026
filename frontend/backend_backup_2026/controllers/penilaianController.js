const db =
require("../config/database");





exports.getPenilaianOPD=

(req,res)=>{


const opd_id =
req.params.opd_id;




db.query(

`

SELECT *

FROM penilaian

WHERE opd_id=?

`,

[opd_id],


(err,result)=>{


res.json({

success:true,

data:result

});


}


);


};









exports.savePenilaian=

(req,res)=>{


const data =
req.body;



const sql=

`

INSERT INTO penilaian

(

opd_id,

indikator_id,

nilai_input,

nilai_bobot

)

VALUES ?

`;




const values =

data.map(item=>[

item.opd_id,

item.indikator_id,

item.nilai_input,

item.nilai_bobot

]);





db.query(

sql,

[values],


(err)=>{


if(err)

return res.status(500)

.json({

message:err.message

});



res.json({

success:true,

message:

"Penilaian berhasil disimpan"

});


}

);


};