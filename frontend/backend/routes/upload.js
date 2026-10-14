const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/bukti/");

},


filename:(req,file,cb)=>{


cb(

null,

Date.now()+path.extname(file.originalname)

);


}


});



const upload = multer({
storage
});



router.post(
"/",
upload.single("file"),
(req,res)=>{


if(!req.file){

return res.status(400).json({

success:false,

message:"Tidak ada file"

});

}



res.json({

success:true,

filename:req.file.filename

});


}

);



module.exports = router;