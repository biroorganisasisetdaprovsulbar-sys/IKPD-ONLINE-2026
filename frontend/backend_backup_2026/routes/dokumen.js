const express = require("express");
const router = express.Router();

const db = require("../database");

const multer = require("multer");


// lokasi penyimpanan file

const storage = multer.diskStorage({

    destination:function(req,file,cb){

        cb(null,"uploads/");

    },


    filename:function(req,file,cb){

        cb(null,Date.now()+"-"+file.originalname);

    }

});


const upload = multer({
    storage:storage
});



// =========================
// UPLOAD DOKUMEN
// =========================

router.post(
"/upload",
upload.single("file"),
(req,res)=>{


    console.log("BODY :",req.body);

    console.log("FILE :",req.file);



    if(!req.file){

        return res.status(400).json({

            message:"File belum diterima server"

        });

    }



    const opd_id=req.body.opd_id;



    const sql=`

    INSERT INTO dokumen

    (
        opd_id,
        nama_file,
        file_path,
        status
    )

    VALUES (?,?,?,?)

    `;



    db.query(

        sql,

        [

            opd_id,

            req.file.originalname,

            req.file.path,

            "Menunggu"

        ],


        (err,result)=>{


            if(err){

                console.log(err);


                return res.status(500).json({

                    error:err

                });

            }



            res.json({

                message:"Dokumen berhasil upload",

                id:result.insertId

            });



        }

    );



});



module.exports=router;