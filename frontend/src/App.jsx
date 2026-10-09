import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataOPD from "./pages/DataOPD";
import Indikator from "./pages/Indikator";
import Penilaian from "./pages/Penilaian";
import BuktiDukung from "./pages/BuktiDukung";
import Laporan from "./pages/Laporan";
import Pengguna from "./pages/Pengguna";

function ProtectedRoute({children}){

const user = localStorage.getItem("ikpd_user");


if(!user){

return <Navigate to="/login"/>

}


return children;

}

function App(){

return(

<Routes>

<Route path="/login" element={<Login/>}/>

<Route 
path="/" 
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route path="/opd" element={<DataOPD/>}/>

<Route path="/indikator" element={<Indikator/>}/>

<Route path="/penilaian" element={<Penilaian/>}/>

<Route path="/bukti" element={<BuktiDukung/>}/>

<Route path="/laporan" element={<Laporan/>}/>

<Route path="/pengguna" element={<Pengguna/>}/>


</Routes>

)

}

export default App;
