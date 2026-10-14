const express = require("express");
const router = express.Router();

const db = require("../database");


// =====================================
// PUBLIC DAFTAR OPD DAN NILAI IKPD
// =====================================

router.get("/evaluasi", async(req,res)=>{

    try{


        const [rows] = await db.query(`

            SELECT

            o.id,
            o.nama_opd,

            COALESCE(
                ROUND(AVG(p.nilai),2),
                0
            ) AS nilai_ikpd,

            COALESCE(
                MAX(p.status),
                'Belum Evaluasi'
            ) AS status

            FROM opd o

            LEFT JOIN penilaian p
            ON p.opd_id=o.id

            GROUP BY
            o.id,
            o.nama_opd

            ORDER BY o.id ASC


        `);


        res.json({

            success:true,

            data:rows

        });



    }catch(error){


        console.log(
            "ERROR OPD PUBLIC:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });



    }



});


module.exports = router;