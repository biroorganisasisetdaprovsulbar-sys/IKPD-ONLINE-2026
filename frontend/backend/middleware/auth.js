const jwt = require("jsonwebtoken");


const verifyToken=(req,res,next)=>{


const header =
req.headers.authorization;



if(!header){

return res.status(401).json({

message:"Token tidak tersedia"

});


}



const token =
header.split(" ")[1];



try{


const decoded =
jwt.verify(

token,

process.env.JWT_SECRET

);



req.user=decoded;


next();



}

catch(error){


return res.status(403).json({

message:"Token tidak valid"

});


}



};


module.exports=verifyToken;