const db =
require("../config/database");





exports.getIndikator=

(req,res)=>{


db.query(

`

SELECT *

FROM indikator

ORDER BY id DESC

`,

(err,result)=>{


res.json({

success:true,

data:result

});


}

);


};









exports.createIndikator=

(req,res)=>{


const {

kode_indikator,

nama_indikator,

bobot

}

=req.body;




db.query(

`

INSERT INTO indikator

(

kode_indikator,

nama_indikator,

bobot

)

VALUES(?,?,?)

`,

[

kode_indikator,

nama_indikator,

bobot

],


()=>{


res.json({

success:true,

message:

"Indikator ditambahkan"

});


}


);


};









exports.deleteIndikator=

(req,res)=>{


db.query(

`

DELETE FROM indikator

WHERE id=?

`,

[req.params.id],


()=>{


res.json({

success:true

});


}


);


};