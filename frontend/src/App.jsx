import React from "react";

import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Login from "./pages/Login";

import Layout from "./pages/Layout";

import Dashboard from "./pages/Dashboard";
import Penilaian from "./pages/Penilaian";
import OPD from "./pages/OPD";
import Indikator from "./pages/Indikator";
import BuktiDukung from "./pages/BuktiDukung";
import Verifikasi from "./pages/Verifikasi";
import Laporan from "./pages/Laporan";
import Pengguna from "./pages/Pengguna";
import Home from "./pages/Home";
import DashboardIKPD from "./pages/DashboardIKPD";

function App(){


return (

<Routes>


    {/* HALAMAN LOGIN */}

    <Route

        path="/login"

        element={<Login/>}

    />



    {/* AREA APLIKASI */}

    <Route

        element={<Layout/>}

    >


        <Route

            path="/dashboard"

            element={<Dashboard/>}

        />


        <Route

            path="/penilaian"

            element={<Penilaian/>}

        />


        <Route

            path="/opd"

            element={<OPD/>}

        />


        <Route

            path="/indikator"

            element={<Indikator/>}

        />


        <Route

            path="/bukti-dukung"

            element={<BuktiDukung/>}

        />

        <Route

path="/verifikasi"

element={<Verifikasi/>}

/>


        <Route

            path="/laporan"

            element={<Laporan/>}

        />


        <Route

            path="/pengguna"

            element={<Pengguna/>}

        />


    </Route>

<Route
    path="/dashboard-ikpd"
    element={<DashboardIKPD/>}
/>

    <Route

        path="/"

         element={<Navigate to="/login"/>

        }

    />


</Routes>


);


}


export default App;