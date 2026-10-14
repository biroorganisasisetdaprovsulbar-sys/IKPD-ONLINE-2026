const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const login = async (req,res)=>{

    try {

        const {
            username,
            password
        } = req.body;


        if(!username || !password){

            return res.status(400).json({

                success:false,
                message:"Username dan password wajib diisi"

            });

        }


        const sql = `
            SELECT *
            FROM users
            WHERE username=?
            LIMIT 1
        `;


        db.query(
            sql,
            [username],
            async(err,result)=>{


                if(err){

                    console.error(err);

                    return res.status(500).json({

                        success:false,
                        message:"Database error"

                    });

                }



                if(result.length===0){

                    return res.status(401).json({

                        success:false,
                        message:"Username atau password salah"

                    });

                }



                const user=result[0];


                const cocok =
                await bcrypt.compare(
                    password,
                    user.password
                );


                console.log(
                    "LOGIN:",
                    user.username,
                    cocok
                );



                if(!cocok){

                    return res.status(401).json({

                        success:false,
                        message:"Username atau password salah"

                    });

                }



                const token =
                jwt.sign(

                    {
                        id:user.id,
                        role:user.role,
                        opd_id:user.opd_id

                    },

                    process.env.JWT_SECRET,

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


            }
        );


    }
    catch(error){

        console.error(error);


        res.status(500).json({

            success:false,
            message:"Server error"

        });

    }

};



module.exports={
    login
};