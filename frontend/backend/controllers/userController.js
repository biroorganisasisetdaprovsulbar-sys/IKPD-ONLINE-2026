const db =
require("../config/database");

const bcrypt =
require("bcrypt");





exports.getUsers =

(req,res)=>{


db.query(

`

SELECT

users.id,
users.nama,
users.username,
users.role,
users.status,
opd.nama_opd


FROM users

LEFT JOIN opd

ON users.opd_id = opd.id


ORDER BY users.id DESC

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









exports.createUser =

async(req,res)=>{


const {

nama,

username,

password,

role,

opd_id

}

=req.body;





const hash =

await bcrypt.hash(

password,

10

);






db.query(

`

INSERT INTO users

(

nama,

username,

password,

role,

opd_id

)

VALUES (?,?,?,?,?)

`,

[

nama,

username,

hash,

role,

opd_id || null

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

"User berhasil dibuat"

});



}

);



};









exports.deleteUser =

(req,res)=>{


db.query(

`

DELETE FROM users

WHERE id=?

`,

[req.params.id],


(err)=>{


if(err)

return res.status(500)

.json({

success:false

});



res.json({

success:true,

message:

"User dihapus"

});


}


);


};