const express = require("express");
const router = express.Router();

const db = require("../database");



// ======================================
// GET SEMUA INDIKATOR
// ======================================

router.get("/", async(req,res)=>{


    try{


        const [rows] = await db.query(`

            SELECT
id,
kode_indikator,
nama_indikator,
bobot
FROM indikator
ORDER BY id ASC


        `);



        res.json(rows);



    }
    catch(error){


        console.log(
            "ERROR GET INDIKATOR:",
            error
        );


        res.status(500).json({

            message:error.message

        });



    }



});





// ======================================
// TAMBAH INDIKATOR
// ======================================


router.post("/", async(req,res)=>{


    try{


        const {

            kode,
            nama_indikator,
            bobot

        } = req.body;



        await db.query(

            `
            INSERT INTO indikator
            (
                kode,
                nama_indikator,
                bobot
            )

            VALUES (?,?,?)

            `,

            [
                kode,
                nama_indikator,
                bobot
            ]

        );



        res.json({

            success:true,

            message:
            "Indikator berhasil ditambahkan"

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }



});





// ======================================
// UPDATE INDIKATOR
// ======================================


router.put("/:id", async(req,res)=>{


    try{


        const id=req.params.id;


        const {

            kode,
            nama_indikator,
            bobot

        }=req.body;




        await db.query(

            `

            UPDATE indikator

            SET

            kode=?,
            nama_indikator=?,
            bobot=?


            WHERE id=?


            `,


            [

                kode,
                nama_indikator,
                bobot,
                id

            ]

        );



        res.json({

            success:true,

            message:
            "Indikator diperbarui"

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });



    }



});





// ======================================
// DELETE INDIKATOR
// ======================================


router.delete("/:id", async(req,res)=>{


    try{


        await db.query(

            `
            DELETE FROM indikator
            WHERE id=?

            `,

            [
                req.params.id
            ]

        );



        res.json({

            success:true,

            message:
            "Indikator dihapus"

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }



});




module.exports = router;