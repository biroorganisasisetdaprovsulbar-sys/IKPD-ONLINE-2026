const express=require("express");

const cors=require("cors");


const app=express();

const dashboardRoute =
require("./routes/dashboard");


app.use(
"/api/dashboard",
dashboardRoute
);

app.use(cors());

app.use(express.json());

const path = require("path");


app.use(
"/uploads",
express.static(
path.join(__dirname,"uploads")
)
);

app.use(
"/uploads",
express.static("uploads")
);



const buktiRouter =
require("./routes/bukti");


app.use(
"/api/bukti",
buktiRouter
);



app.listen(
5000,
()=>{

console.log(
"Server berjalan port 5000"
);

}

);