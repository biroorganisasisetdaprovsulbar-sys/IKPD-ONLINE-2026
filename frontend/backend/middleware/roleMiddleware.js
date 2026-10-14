const checkRole=(roles)=>{


return(req,res,next)=>{


if(

!roles.includes(

req.user.role

)

){


return res.status(403).json({

success:false,

message:

"Anda tidak memiliki hak akses"

});


}



next();


};


};



module.exports = checkRole;