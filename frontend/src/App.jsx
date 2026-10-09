import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import DataOPD from "./pages/DataOPD";
import Penilaian from "./pages/Penilaian";
import Indikator from "./pages/Indikator";
import Pengguna from "./pages/Pengguna";
import Laporan from "./pages/Laporan";
import BuktiDukung from "./pages/BuktiDukung";
import Login from "./pages/Login";



function App(){


return (

<BrowserRouter>


<Routes>


{/* halaman login */}
<Route
path="/"
element={<Login/>}
/>



{/* semua halaman setelah login */}
<Route element={<Layout/>}>


<Route
path="/dashboard"
element={<Dashboard/>}
/>


<Route
path="/data-opd"
element={<DataOPD/>}
/>


<Route
path="/penilaian"
element={<Penilaian/>}
/>


<Route
path="/indikator"
element={<Indikator/>}
/>


<Route path="/pengguna" element={<Pengguna />} />


<Route
path="/laporan"
element={<Laporan/>}
/>


<Route
path="/bukti"
element={<BuktiDukung/>}
/>



</Route>



</Routes>


</BrowserRouter>


);


}


export default App;
