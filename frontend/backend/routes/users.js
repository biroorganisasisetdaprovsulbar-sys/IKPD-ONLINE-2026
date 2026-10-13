const express = require("express");
const router = express.Router();

const db = require("../database");
const bcrypt = require("bcryptjs");



// =====================================================
// GET SEMUA USER
// =====================================================

router.get("/", (req,res)=>{


    const sql = `

        SELECT 
            users.id,
            users.nama,
            users.username,
            users.role,
            users.opd_id,
            opd.nama_opd

        FROM users

        LEFT JOIN opd
        ON users.opd_id = opd.id

        ORDER BY users.id DESC

    `;


    db.query(sql,(err,result)=>{


        if(err){

            return res.status(500).json({

                success:false,
                message:"Gagal mengambil data user",
                error:err

            });

        }



        res.json({

            success:true,
            data:result

        });


    });



});





// =====================================================
// TAMBAH USER
// =====================================================

router.post("/", async(req,res)=>{


    try{


        const {

            nama,
            username,
            password,
            role,
            opd_id

        } = req.body;




        if(
            !nama ||
            !username ||
            !password ||
            !role
        ){

            return res.status(400).json({

                success:false,
                message:"Data user belum lengkap"

            });

        }





        // cek username

        db.query(

            "SELECT id FROM users WHERE username=?",

            [username],


            async(err,result)=>{


                if(err){

                    return res.status(500).json(err);

                }



                if(result.length>0){


                    return res.status(400).json({

                        success:false,
                        message:"Username sudah digunakan"

                    });


                }





                const hash = await bcrypt.hash(
                    password,
                    10
                );




                const sql = `

                    INSERT INTO users

                    (
                        nama,
                        username,
                        password,
                        role,
                        opd_id
                    )

                    VALUES(?,?,?,?,?)

                `;



                db.query(

                    sql,

                    [

                        nama,
                        username,
                        hash,
                        role,
                        opd_id || null

                    ],



                    (err)=>{


                        if(err){

                            return res.status(500).json(err);

                        }




                        res.json({

                            success:true,

                            message:
                            "User berhasil dibuat"

                        });


                    }


                );




            }

        );



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:
            "Terjadi kesalahan server",

            error

        });


    }



});






// =====================================================
// UPDATE USER
// =====================================================

router.put("/:id", async(req,res)=>{


    try{


        const id = req.params.id;



        const {

            nama,
            username,
            password,
            role,
            opd_id

        } = req.body;






        let sql;

        let values;






        // jika password diganti

        if(password){



            const hash =
            await bcrypt.hash(
                password,
                10
            );



            sql = `

                UPDATE users

                SET

                    nama=?,
                    username=?,
                    password=?,
                    role=?,
                    opd_id=?

                WHERE id=?

            `;



            values=[

                nama,
                username,
                hash,
                role,
                opd_id || null,
                id

            ];



        }



        // jika password kosong

        else{



            sql = `

                UPDATE users

                SET

                    nama=?,
                    username=?,
                    role=?,
                    opd_id=?

                WHERE id=?

            `;



            values=[

                nama,
                username,
                role,
                opd_id || null,
                id

            ];



        }





        db.query(

            sql,

            values,


            (err)=>{


                if(err){


                    return res.status(500).json(err);


                }




                res.json({

                    success:true,

                    message:
                    "User berhasil diperbarui"


                });



            }


        );



    }


    catch(error){


        res.status(500).json({

            success:false,

            message:
            "Gagal update user",

            error

        });


    }



});







// =====================================================
// DELETE USER
// =====================================================

router.delete("/:id",(req,res)=>{


    const id=req.params.id;



    db.query(

        "DELETE FROM users WHERE id=?",

        [id],


        (err)=>{


            if(err){


                return res.status(500).json({

                    success:false,

                    message:
                    "User gagal dihapus",

                    error

                });


            }





            res.json({

                success:true,

                message:
                "User berhasil dihapus"

            });



        }


    );



});






module.exports = router;