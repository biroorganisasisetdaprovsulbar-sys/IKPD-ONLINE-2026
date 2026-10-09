import React from "react";
import {Outlet,Link} from "react-router-dom";

import "./Dashboard.css";


export default function Layout(){


return (

<div className="app">


<aside className="sidebar">


<div className="brand">

<img 
src="/logo-sulbar.png"
alt="Sulawesi Barat"
/>


<div>

<h2>IKPD</h2>

<span>
ONLINE 2026
</span>

</div>

<img
src="/logo-sulbar.png"
alt="Logo Sulbar"
onError={(e)=>{
e.target.src="/vite.svg"
}}
/>

</div>


<div>
<h2>IKPD</h2>
<p>ONLINE 2026</p>
</div>


</div>


<div>

<h2>
IKPD
</h2>

<p>
ONLINE 2026
</p>


</div>


</div>





<div className="user">

👤

<div>

<b>
Administrator
</b>

<br/>

<span>
Admin Sistem
</span>


</div>


</div>


<nav>

<Link to="/dashboard">
🏠 Dashboard
</Link>


<Link to="/data-opd">
🏢 Data OPD
</Link>


<Link to="/penilaian">
📊 Penilaian
</Link>


<Link to="/bukti-dukung">
📁 Bukti Dukungan
</Link>


<Link to="/laporan">
📄 Laporan
</Link>


<Link to="/pengguna">
👥 Pengguna
</Link>


</nav>




<button className="logout">

Keluar

</button>




</aside>






<main className="main">


<header className="topbar">


<h1>
IKPD ONLINE 2026
</h1>


<div className="admin">

Administrator

</div>


</header>




<Outlet/>




</main>


</div>


);


}
