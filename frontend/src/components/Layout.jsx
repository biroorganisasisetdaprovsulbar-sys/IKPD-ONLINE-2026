import React from "react";

import {
    Outlet
} from "react-router-dom";


import Sidebar from "./Sidebar";

import Header from "./Header";

import "./Layout.css";



const Layout = () => {


    return (

        <div className="app-layout">


            {/* SIDEBAR */}

            <Sidebar />



            {/* AREA UTAMA */}

            <div className="main-area">



                {/* HEADER */}

                <Header />




                {/* CONTENT */}

                <main className="content-area">


                    <Outlet />


                </main>



            </div>


        </div>

    );


};



export default Layout;