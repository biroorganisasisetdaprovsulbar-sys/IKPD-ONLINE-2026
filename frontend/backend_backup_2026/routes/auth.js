console.log("AUTH ROUTE AKTIF");

const express = require("express");
const router = express.Router();

const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const SECRET_KEY = "IKPD2026";



router.post("/login", async (req,res)=>{

    const {username,password} = req.body;


    if(!username || !password){
        return res.json({
            success:false,
            message:"Username dan password wajib diisi"
        });
    }


    const sql = `
        SELECT *
        FROM users
        WHERE username=?
    `;


    db.query(sql,[username], async(err,result)=>{


        if(err){
            console.log(err);

            return res.status(500).json({
                success:false,
                message:"Database error"
            });
        }



        if(result.length===0){

            return res.json({

                success:false,
                message:"User tidak ditemukan"

            });

        }



        const user=result[0];



        const cocok = await bcrypt.compare(
            password,
            user.password
        );



        console.log("USER:",user.username);
        console.log("COMPARE:",cocok);



        if(!cocok){

            return res.json({

                success:false,
                message:"Password salah"

            });

        }



        const token = jwt.sign(

            {
                id:user.id,
                role:user.role,
                opd_id:user.opd_id

            },

            SECRET_KEY,

            {
                expiresIn:"8h"
            }

        );



        return res.json({

            success:true,

            message:"Login berhasil",

            token,

            user:{
                id:user.id,
                nama:user.nama,
                username:user.username,
                role:user.role,
                opd_id:user.opd_id
            }

        });



    });


});



module.exports = router;