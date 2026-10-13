require("dotenv").config();


const express =
require("express");


const cors =
require("cors");



const app =
express();





app.use(
cors()
);



app.use(
express.json()
);



app.use(
express.urlencoded({

extended:true

})
);





// ROUTES


app.use(

"/api",

require("./routes/auth")

);



app.use(

"/api/users",

require("./routes/users")

);



app.use(

"/api/opd",

require("./routes/opd")

);



app.use(

"/api/indikator",

require("./routes/indikator")

);



app.use(

"/api/penilaian",

require("./routes/penilaian")

);



app.use(

"/api/bukti",

require("./routes/bukti")

);






app.use("/api/periode", require("./routes/periode"));

app.get("/",(req,res)=>{


res.json({

message:

"IKPD ONLINE 2026 API Running"

});


});







const PORT =
process.env.PORT || 5000;



app.listen(

PORT,

()=>{


console.log(

`Server berjalan pada port ${PORT}`

);


}

);