const {
    verifyToken,
    adminOnly
}=require("../middleware/authMiddleware");


const express = require("express");

const router = express.Router();


const db = require("../database");




// ==================================================
// PUBLIC DATA OPD
// Dipakai halaman Login
// Tidak membutuhkan token
// ==================================================

router.get("/public",(req,res)=>{


    const sql = `


    SELECT


    o.nama_opd,


    ROUND(
        COALESCE(
            SUM(p.nilai_bobot),
            0
        ),
        2
    ) AS nilai_akhir,



    CASE


        WHEN COALESCE(SUM(p.nilai_bobot),0) >= 80

        THEN 'Sangat Baik'



        WHEN COALESCE(SUM(p.nilai_bobot),0) >= 70

        THEN 'Baik'



        ELSE 'Perlu Perbaikan'


    END AS kategori



    FROM opd o



    LEFT JOIN penilaian p


    ON o.id = p.opd_id



    GROUP BY

    o.id,
    o.nama_opd



    ORDER BY

    nilai_akhir DESC



    `;



    db.query(
        sql,
        (err,result)=>{


            if(err){


                console.log(err);



                return res.status(500).json({

                    success:false,

                    message:err.message

                });


            }




            res.json(result);



        }
    );



});








// ==================================================
// GET SEMUA OPD
// ADMIN
// ==================================================

router.get(
"/",
verifyToken,
adminOnly,
(req,res)=>{


    const sql = `

        SELECT *

        FROM opd

        ORDER BY id DESC

    `;



    db.query(
        sql,
        (err,result)=>{


            if(err){


                console.log(err);



                return res.status(500).json({

                    success:false,

                    message:err.message

                });


            }



            res.json({

                success:true,

                data:result

            });



        }
    );


});









// ==================================================
// TAMBAH OPD
// ADMIN
// ==================================================


router.post(
"/",
verifyToken,
adminOnly,
(req,res)=>{


    const {

        nama_opd,

        kode_opd,

        tahun


    } = req.body;





    if(
        !nama_opd ||
        !kode_opd ||
        !tahun
    ){


        return res.status(400).json({

            success:false,

            message:
            "Nama OPD, kode OPD dan tahun wajib diisi"


        });


    }







    const sql = `

        INSERT INTO opd

        (

            nama_opd,

            kode_opd,

            tahun

        )

        VALUES (?,?,?)


    `;






    db.query(

        sql,

        [

            nama_opd,

            kode_opd,

            tahun

        ],


        (err,result)=>{


            if(err){


                console.log(err);



                return res.status(500).json({

                    success:false,

                    message:err.message

                });



            }





            res.json({

                success:true,

                message:
                "OPD berhasil disimpan",


                id:
                result.insertId


            });




        }



    );



});









// ==================================================
// DELETE OPD AMAN
// Hapus:
// penilaian
// bukti
// user opd
// opd
// ==================================================


router.delete(
"/:id",
verifyToken,
adminOnly,
(req,res)=>{


    const id=req.params.id;




    db.beginTransaction(
    (err)=>{


        if(err){

            return res.status(500).json(err);

        }





        db.query(

            "DELETE FROM penilaian WHERE opd_id=?",

            [id],


            (err)=>{


                if(err){

                    return db.rollback(()=>{

                        res.status(500).json(err);

                    });

                }






                db.query(

                    "DELETE FROM bukti_dukung WHERE opd_id=?",

                    [id],


                    (err)=>{


                        if(err){


                            return db.rollback(()=>{

                                res.status(500).json(err);

                            });


                        }








                        db.query(

                            "DELETE FROM users WHERE opd_id=?",

                            [id],


                            (err)=>{


                                if(err){


                                    return db.rollback(()=>{

                                        res.status(500).json(err);

                                    });


                                }








                                db.query(

                                    "DELETE FROM opd WHERE id=?",

                                    [id],


                                    (err)=>{


                                        if(err){


                                            return db.rollback(()=>{

                                                res.status(500).json(err);

                                            });


                                        }





                                        db.commit(
                                        (err)=>{


                                            if(err){


                                                return db.rollback(()=>{

                                                    res.status(500).json(err);

                                                });


                                            }



                                            res.json({

                                                success:true,

                                                message:
                                                "OPD berhasil dihapus"

                                            });



                                        });



                                    });



                            });



                    });



            });



    });



});






module.exports = router;