const express = require("express");
const router = express.Router();

const db = require("../database");




// ======================================================
// GET SEMUA INDIKATOR
// ======================================================

router.get("/", (req,res)=>{


    const sql = `

        SELECT

            indikator.id,

            indikator.kode_indikator,

            indikator.nama_indikator,

            indikator.bobot,


            tingkat_indikator.id AS tingkat_id,

            tingkat_indikator.tingkat,

            tingkat_indikator.uraian,

            tingkat_indikator.bukti_dukung


        FROM indikator


        LEFT JOIN tingkat_indikator


        ON indikator.id =
        tingkat_indikator.indikator_id



        ORDER BY

        indikator.id,

        tingkat_indikator.tingkat


    `;



    db.query(sql,(err,result)=>{


        if(err){


            return res.status(500).json({

                success:false,

                message:
                "Gagal mengambil indikator",

                error:err

            });


        }



        res.json({

            success:true,

            data:result


        });



    });



});









// ======================================================
// TAMBAH INDIKATOR
// ======================================================

router.post("/",(req,res)=>{


    const {


        kode_indikator,

        nama_indikator,

        bobot


    } = req.body;





    if(

        !kode_indikator ||

        !nama_indikator ||

        !bobot


    ){


        return res.status(400).json({

            success:false,

            message:
            "Data indikator belum lengkap"

        });


    }







    const cekBobot =
    Number(bobot);



    if(

        cekBobot <=0 ||

        cekBobot >100


    ){


        return res.status(400).json({

            success:false,

            message:
            "Bobot harus 1 sampai 100"

        });


    }








    const sql = `


        INSERT INTO indikator

        (

            kode_indikator,

            nama_indikator,

            bobot

        )


        VALUES(?,?,?)


    `;






    db.query(

        sql,


        [

            kode_indikator,

            nama_indikator,

            bobot

        ],



        (err,result)=>{


            if(err){


                return res.status(500).json({

                    success:false,

                    message:
                    "Gagal menyimpan indikator",

                    error:err

                });


            }





            res.json({

                success:true,

                message:
                "Indikator berhasil ditambahkan",

                id:
                result.insertId


            });



        }



    );



});









// ======================================================
// UPDATE INDIKATOR
// ======================================================

router.put("/:id",(req,res)=>{


    const id =
    req.params.id;



    const {


        kode_indikator,

        nama_indikator,

        bobot


    } = req.body;







    const sql = `


        UPDATE indikator


        SET


            kode_indikator=?,

            nama_indikator=?,

            bobot=?



        WHERE id=?


    `;







    db.query(


        sql,


        [

            kode_indikator,

            nama_indikator,

            bobot,

            id


        ],



        (err)=>{


            if(err){


                return res.status(500).json({

                    success:false,

                    message:
                    "Gagal memperbarui indikator",

                    error:err


                });


            }






            res.json({

                success:true,

                message:
                "Indikator berhasil diperbarui"


            });



        }


    );




});









// ======================================================
// DELETE INDIKATOR
// ======================================================

router.delete("/:id",(req,res)=>{


    const id =
    req.params.id;





    db.query(


        "DELETE FROM indikator WHERE id=?",


        [id],



        (err)=>{


            if(err){


                return res.status(500).json({

                    success:false,

                    message:
                    "Indikator gagal dihapus",

                    error:err

                });


            }







            res.json({

                success:true,

                message:
                "Indikator berhasil dihapus"


            });




        }



    );



});






module.exports = router;