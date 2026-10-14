const db=require("../database");


const logActivity=async(

user_id,

aktivitas,

modul

)=>{


await db.query(

`

INSERT INTO audit_log

(

user_id,

aktivitas,

modul

)

VALUES

(?,?,?)

`

,

[

user_id,

aktivitas,

modul

]

);


};



module.exports=logActivity;