const express=require("express");

const router=express.Router();


const jwt=require("jsonwebtoken");


const db=require("../database");

const bcrypt=require("bcrypt");




router.post(

"/login",

async(req,res)=>{


const {

username,

password

}=req.body;



const [rows]=await db.query(

`

SELECT *

FROM users

WHERE username=?

`

,

[username]

);



if(rows.length===0){


return res.status(401).json({

message:"User tidak ditemukan"

});


}




const user=rows[0];




const valid=

await bcrypt.compare(

password,

user.password

);




if(!valid){


return res.status(401).json({

message:"Password salah"

});


}







const token=

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

nama:user.nama,

role:user.role

}

});


});


module.exports=router;