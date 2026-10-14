import React from "react";

import {
useNavigate
} from "react-router-dom";


import {

Building2,
BarChart3,
CalendarDays

} from "lucide-react";


import "./Home.css";




const Home=()=>{


const navigate=useNavigate();



return(


<div className="home-page">



<div className="home-overlay">





<h1>

IKPD ONLINE 2026

</h1>



<h2>

Sistem Informasi Evaluasi

<br/>

Indeks Kematangan Perangkat Daerah

</h2>



<p>

Platform digital evaluasi, penilaian,
verifikasi, dan pelaporan kematangan
perangkat daerah.

</p>




<button

onClick={()=>navigate("/login")}

>

Masuk Sistem

</button>







<div className="public-stat">



<div>

<Building2/>

<h3>

OPD

</h3>

<span>

Perangkat Daerah

</span>

</div>



<div>

<CalendarDays/>

<h3>

2026

</h3>

<span>

Periode Evaluasi

</span>

</div>




<div>

<BarChart3/>

<h3>

IKPD

</h3>

<span>

Indeks Evaluasi

</span>

</div>




</div>






</div>


</div>


);


};


export default Home;