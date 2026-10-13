import React from "react";


import Sidebar from "./Sidebar";

import Navbar from "./Navbar";


import "./Layout.css";



export default function Layout({children}){


return(


<div className="app-layout">



<Sidebar />



<div className="main-area">


<Navbar />



<div className="content-area">

{children}

</div>



</div>



</div>


);


}