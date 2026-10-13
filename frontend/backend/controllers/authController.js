const db =
require("../config/database");


const bcrypt =
require("bcrypt");


const jwt =
require("jsonwebtoken");





exports.login =

(req,res)=>{


const {

username,

password

}

=

req.body;





const sql =

`

SELECT *

FROM users

WHERE username=?

AND status='Aktif'

`;





db.query(

sql,

[username],

async(err,result)=>{


if(err)

return res.status(500)

.json({

success:false,

message:err.message

});






if(result.length===0){


return res.json({

success:false,

message:

"Username tidak ditemukan"

});


}





const user=result[0];





const valid =

await bcrypt.compare(

password,

user.password

);





if(!valid){


return res.json({

success:false,

message:

"Password salah"

});


}






const token =

jwt.sign(

{


id:user.id,


role:user.role,


opd_id:user.opd_id


},


process.env.JWT_SECRET,


{

expiresIn:"8h"

}


);






res.json({

success:true,


token,


user:{


id:user.id,


nama:user.nama,


role:user.role,


opd_id:user.opd_id


}



});




}


);



};