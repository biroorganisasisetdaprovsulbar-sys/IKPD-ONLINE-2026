import React from "react";

import {
Bell,
UserCircle
} from "lucide-react";


import "./Header.css";


const Header=()=>{


return(

<header className="main-header">


<div className="header-title">


<h2>
IKPD ONLINE 2026
</h2>


<span>
Sistem Informasi Evaluasi Indeks Kematangan Perangkat Daerah
</span>


</div>





<div className="header-right">


<button className="notification">


<Bell size={20}/>


</button>



<div className="profile">


<UserCircle size={35}/>


<div>

<strong>
Administrator
</strong>

<small>
Admin Sistem
</small>

</div>


</div>



</div>



</header>

);


};


export default Header;