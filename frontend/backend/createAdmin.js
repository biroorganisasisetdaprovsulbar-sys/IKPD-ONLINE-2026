const bcrypt=require("bcryptjs");
const db=require("./database");


const password="admin";


bcrypt.hash(password,10,(err,hash)=>{


const sql=`

INSERT INTO users
(
nama,
username,
password,
role,
opd_id
)

VALUES
(
?,
?,
?,
?,
?
)

`;


db.query(
sql,
[
"Administrator",
"admin",
hash,
"admin",
null
],

(err,result)=>{


if(err)
console.log(err);


else
console.log("Admin berhasil dibuat");


process.exit();

}


);


});