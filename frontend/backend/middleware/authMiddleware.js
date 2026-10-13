// =====================================
// AUTH MIDDLEWARE IKPD ONLINE 2026
// =====================================


const jwt = require("jsonwebtoken");


// HARUS SAMA DENGAN auth.js
const SECRET_KEY = "IKPD2026";




// =====================================
// VERIFY TOKEN
// =====================================

function verifyToken(req,res,next){


    const authHeader =
    req.headers.authorization;



    // cek apakah header token ada

    if(!authHeader){


        return res.status(401).json({

            success:false,

            message:
            "Token tidak ditemukan"

        });


    }





    // format:
    // Bearer xxxxxxxxx

    const token =
    authHeader.split(" ")[1];




    if(!token){


        return res.status(401).json({

            success:false,

            message:
            "Format token salah"

        });


    }







    try{


        const decoded =
        jwt.verify(

            token,

            SECRET_KEY

        );



        // simpan data user

        req.user = decoded;



        next();



    }


    catch(error){


        console.log(
            "TOKEN ERROR:",
            error.message
        );



        return res.status(401).json({

            success:false,

            message:
            "Token tidak valid atau kadaluarsa"

        });



    }



}









// =====================================
// ADMIN ONLY
// =====================================


function adminOnly(req,res,next){



    if(!req.user){


        return res.status(401).json({

            success:false,

            message:
            "User belum login"

        });


    }




    if(req.user.role !== "admin"){


        return res.status(403).json({

            success:false,

            message:
            "Akses hanya administrator"

        });


    }




    next();


}









// =====================================
// OPD ONLY
// =====================================


function opdOnly(req,res,next){



    if(!req.user){


        return res.status(401).json({

            success:false,

            message:
            "User belum login"

        });


    }





    if(req.user.role !== "opd"){


        return res.status(403).json({

            success:false,

            message:
            "Akses hanya OPD"

        });


    }




    next();



}









// =====================================
// EXPORT
// =====================================


module.exports = {


    verifyToken,

    adminOnly,

    opdOnly


};