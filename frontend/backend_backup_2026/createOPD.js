const bcrypt=require("bcryptjs");
const db=require("./database");


bcrypt.hash(
"kesehatan123",
10,
(err,hash)=>{


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
"Admin Dinas Kesehatan",
"kesehatan",
hash,
"opd",
2
],

(err)=>{

if(err)
console.log(err);

else
console.log("Akun OPD berhasil dibuat");

process.exit();

}

);


});