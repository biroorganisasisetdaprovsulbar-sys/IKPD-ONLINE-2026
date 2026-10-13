const express = require("express");

const router = express.Router();

const db = require("../database");



/*
GET PERIODE AKTIF
/api/periode/aktif
*/

router.get(
"/aktif",
(req,res)=>{


const sql = `

SELECT

id,

tahun,

status_aktif

FROM periode_evaluasi

WHERE status_aktif='aktif'

LIMIT 1

`;



db.query(
sql,

(err,result)=>{


if(err){

console.error(err);


return res.status(500).json({

success:false,

message:"Database error"

});


}



res.json({

success:true,

data: result[0] || null

});


}

);


}

);



module.exports = router;
