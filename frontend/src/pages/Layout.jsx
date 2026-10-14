import React from "react";

import {
Outlet
} from "react-router-dom";


import Sidebar from "../components/Sidebar";

import Header from "../components/Header";


import "../components/Layout.css";



export default function Layout(){


return (

<div className="app-layout">


<Sidebar/>


<div className="main-area">


<Header/>


<div className="content-area">


<Outlet/>


</div>


</div>


</div>


);


}