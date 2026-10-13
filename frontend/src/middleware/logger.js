const db =
require("../config/database");


module.exports=(aktivitas)=>{


return(req,res,next)=>{


db.query(

`

INSERT INTO log_activity

(user_id,aktivitas)

VALUES(?,?)

`,

[

req.user.id,

aktivitas

]

);



next();


};



};