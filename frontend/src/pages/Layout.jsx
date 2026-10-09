import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout(){

const navigate = useNavigate();


function handleLogout(){

// hapus data login
localStorage.removeItem("login");
localStorage.removeItem("username");


// kembali ke halaman login
navigate("/");

}


return (

<div className="app-layout">


{/* SIDEBAR */}
<aside className="sidebar">


<div className="brand">

<img 
src="/logo-sulbar.png"
className="sidebar-logo"
alt="Logo Sulawesi Barat"
/>


<div>
<h2>IKPD</h2>
<p>ONLINE 2026</p>
</div>

</div>



<div className="user-box">

<div className="avatar">
👤
</div>

<div>
<strong>Administrator</strong>
<br/>
<span>Admin Sistem</span>
</div>

</div>



<nav className="menu">


<NavLink to="/dashboard">
🏠 Dashboard
</NavLink>


<NavLink to="/data-opd">
🏢 Data OPD
</NavLink>


<NavLink to="/indikator">
📄 Indikator IKPD
</NavLink>


<NavLink to="/penilaian">
📊 Penilaian
</NavLink>


<NavLink to="/bukti">
📁 Bukti Dukungan
</NavLink>


<NavLink to="/laporan">
📑 Laporan
</NavLink>


<NavLink to="/pengguna">
👥 Pengguna
</NavLink>


</nav>



<button 
className="logout"
onClick={handleLogout}
>
Keluar
</button>


</aside>



{/* CONTENT */}

<main className="main-content">

<Outlet/>

</main>


</div>

);

}