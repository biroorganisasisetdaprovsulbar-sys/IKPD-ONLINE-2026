const express = require("express");
const router = express.Router();

const db = require("../database");




// =================================================
// DASHBOARD OPD
// =================================================

router.get("/:opd_id",(req,res)=>{


    const opd_id =
    req.params.opd_id;





    const sql = `

    SELECT


        indikator.id,

        indikator.kode_indikator,

        indikator.nama_indikator,

        indikator.bobot,



        penilaian.nilai_input,

        penilaian.nilai_bobot,

        penilaian.kategori,



        bukti_dukung.status AS status_bukti,

        bukti_dukung.catatan,

        bukti_dukung.file_path



    FROM indikator




    LEFT JOIN penilaian

    ON indikator.id =
    penilaian.indikator_id


    AND penilaian.opd_id = ?





    LEFT JOIN bukti_dukung

    ON bukti_dukung.indikator =
    indikator.kode_indikator


    ORDER BY indikator.id ASC



    `;






    db.query(

        sql,

        [opd_id],


        (err,result)=>{


            if(err){


                console.log(err);


                return res.status(500).json({

                    success:false,

                    message:
                    "Gagal mengambil dashboard OPD",

                    error:err

                });


            }





            res.json({

                success:true,

                data:result


            });




        }


    );



});







module.exports = router;