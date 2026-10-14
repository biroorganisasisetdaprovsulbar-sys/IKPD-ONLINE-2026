require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");


const app = express();


// ===============================
// SECURITY
// ===============================

app.use(
    helmet()
);


app.use(
    morgan("dev")
);



// ===============================
// CORS
// ===============================

app.use(
cors({

    origin:[
        "http://localhost:5173"
    ],

    credentials:true,

    methods:[
        "GET",
        "POST",
        "PUT",
        "DELETE"
    ]

})
);



// ===============================
// BODY PARSER
// ===============================

app.use(
express.json({
    limit:"10mb"
})
);


app.use(
express.urlencoded({

    extended:true,

    limit:"10mb"

})
);



// ===============================
// STATIC FILE
// ===============================

app.use(
"/uploads",
express.static("uploads")
);



// ===============================
// API ROUTES
// ===============================


app.use(
"/api/auth",
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
"/api/opd-dashboard",
require("./routes/opdDashboard")
);



app.use(
"/api/opd-public",
require("./routes/opdPublic")
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
"/api/dashboard",
require("./routes/dashboard")
);



app.use(
"/api/bukti",
require("./routes/bukti")
);



app.use(
"/api/upload",
require("./routes/upload")
);



app.use(
"/api/dokumen",
require("./routes/dokumen")
);



app.use(
"/api/periode",
require("./routes/periode")
);



// ===============================
// HEALTH CHECK
// ===============================


app.get("/",(req,res)=>{

res.json({

success:true,

message:
"IKPD ONLINE 2026 API Running",

version:"1.0.0"

});


});



// ===============================
// ERROR HANDLER
// ===============================


app.use(
(err,req,res,next)=>{


console.error(err);


res.status(500).json({

success:false,

message:
"Internal Server Error"

});


}
);




// ===============================
// START SERVER
// ===============================

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