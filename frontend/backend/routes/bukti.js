const express = require("express");
const router = express.Router();
const db = require("../database");


// ===============================
// GET SEMUA BUKTI DUKUNG
// ===============================
router.get("/", (req, res)=>{

    const sql = `
        SELECT 
            id,
            opd,
            indikator,
            nama_dokumen,
            file_path,
            status,
            catatan,
            created_at
        FROM bukti_dukung
        ORDER BY id DESC
    `;


    db.query(sql,(err,result)=>{

        if(err){
            console.log(err);

            return res.status(500).json({
                message:"Gagal mengambil data"
            });
        }


        res.json(result);

    });

});




// ===============================
// GET DETAIL BUKTI
// ===============================
router.get("/:id",(req,res)=>{

    const id=req.params.id;


    const sql=`
        SELECT *
        FROM bukti_dukung
        WHERE id=?
    `;


    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }


        res.json(result[0]);

    });


});




// ===============================
// VERIFIKASI TERIMA / TOLAK
// ===============================
router.put("/:id",(req,res)=>{


    const id=req.params.id;

    const {
        status,
        catatan
    } = req.body;



    // update bukti

    const sqlUpdate=`

        UPDATE bukti_dukung

        SET 
            status=?,
            catatan=?

        WHERE id=?

    `;



    db.query(
        sqlUpdate,
        [
            status,
            catatan,
            id
        ],

        (err,result)=>{


            if(err){

                console.log(err);

                return res.status(500).json({
                    message:"Update gagal"
                });

            }



            // simpan riwayat

            const sqlHistory=`

                INSERT INTO riwayat_verifikasi
                (
                    bukti_id,
                    status,
                    catatan
                )

                VALUES (?,?,?)

            `;



            db.query(
                sqlHistory,
                [
                    id,
                    status,
                    catatan
                ],

                (err2,result2)=>{


                    if(err2){

                        console.log(err2);

                        return res.status(500).json({
                            message:"Riwayat gagal disimpan"
                        });

                    }



                    res.json({

                        success:true,

                        message:
                        "Verifikasi berhasil"

                    });



                }

            );



        }

    );



});





module.exports = router;