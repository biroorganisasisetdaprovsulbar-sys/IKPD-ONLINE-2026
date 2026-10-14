const express = require("express");
const router = express.Router();

const db = require("../database");


// ======================================
// GET DATA VERIFIKASI
// ======================================

router.get("/", async (req,res)=>{


    try{


        const [rows] = await db.query(`

            SELECT

            o.id,
            o.nama_opd,

            ROUND(
                AVG(p.nilai),
                2
            ) AS nilai,


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


            ORDER BY

            o.id ASC


        `);



        res.json(rows);



    }
    catch(error){


        console.log(
            "ERROR VERIFIKASI GET:",
            error
        );


        res.status(500).json({

            message:error.message

        });



    }



});




// ======================================
// UPDATE STATUS VERIFIKASI
// ======================================


router.put("/:id", async(req,res)=>{


    try{


        const opd_id=req.params.id;


        const {
            status
        } = req.body;



        console.log(
            "UPDATE VERIFIKASI",
            opd_id,
            status
        );



        // cek apakah OPD memiliki penilaian

        const [cek] = await db.query(

            `
            SELECT id
            FROM penilaian
            WHERE opd_id=?
            LIMIT 1
            `,

            [
                opd_id
            ]

        );



        if(cek.length===0){


            return res.status(400).json({

                success:false,

                message:
                "Data penilaian OPD belum tersedia"

            });



        }




        // update hanya OPD yang dipilih

        await db.query(

            `
            UPDATE penilaian

            SET status=?

            WHERE opd_id=?

            `,

            [
                status,
                opd_id
            ]

        );




        res.json({

            success:true,

            message:
            "Status verifikasi berhasil diperbarui"

        });



    }
    catch(error){


        console.log(
            "ERROR UPDATE VERIFIKASI:",
            error
        );



        res.status(500).json({

            success:false,

            message:error.message

        });



    }



});





module.exports = router;