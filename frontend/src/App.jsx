import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";


function Dashboard() {
  return (
    <div>
      <h1>Dashboard IKPD ONLINE 2026</h1>
      <p>
        Sistem Informasi Penilaian Indeks Kematangan Perangkat Daerah
      </p>
    </div>
  );
}


function App() {
  return (
    <Routes>

      <Route 
        path="/login" 
        element={<Login />} 
      />

      <Route 
        path="/" 
        element={<Dashboard />} 
      />

    </Routes>
  );
}


export default App;
