import React from "react";

import {
    Outlet
} from "react-router-dom";


export default function Layout(){

    return (

        <div
        style={{
            padding:"30px",
            fontSize:"30px"
        }}
        >

            LAYOUT BERHASIL

            <Outlet />

        </div>

    );

}