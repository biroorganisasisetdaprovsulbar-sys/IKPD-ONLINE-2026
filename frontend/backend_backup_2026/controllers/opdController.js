const db =
require("../config/database");





exports.getOPD =

(req,res)=>{


db.query(

`

SELECT *

FROM opd

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








exports.createOPD =

(req,res)=>{


const {

nama_opd

}

=req.body;




db.query(

`

INSERT INTO opd

(nama_opd)

VALUES(?)

`,

[nama_opd],


(err)=>{


if(err)

return res.status(500)

.json({

message:err.message

});



res.json({

success:true,

message:

"OPD berhasil ditambah"

});


}

);


};









exports.deleteOPD=

(req,res)=>{


db.query(

`

DELETE FROM opd

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