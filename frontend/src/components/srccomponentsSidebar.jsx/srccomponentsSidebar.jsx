import React from "react";
import {NavLink} from "react-router-dom";


function Sidebar(){


const menu=[

{
name:"Dashboard",
icon:"🏠",
link:"/dashboard"
},

{
name:"Data OPD",
icon:"🏢",
link:"/opd"
},

{
name:"Indikator IKPD",
icon:"📄",
link:"/indikator"
},

{
name:"Penilaian",
icon:"📊",
link:"/penilaian"
},

{
name:"Bukti Dukung",
icon:"📁",
link:"/bukti"
},

{
name:"Laporan",
icon:"📑",
link:"/laporan"
},

{
name:"Pengguna",
icon:"👤",
link:"/pengguna"
}


]


return(

<div className="sidebar">


<div className="brand">

<div className="logo-circle">
IKPD
</div>


<div>

<h2>
ONLINE
</h2>

<p>
2026
</p>

</div>


</div>



<div className="user">

👤 Administrator

</div>




<div className="menu">


{

menu.map((item)=>(


<NavLink

key={item.name}

to={item.link}

className={({isActive})=>

isActive?"menu-item active":"menu-item"

}

>


<span>
{item.icon}
</span>


{item.name}


</NavLink>


))


}



</div>




<button className="logout">

Keluar

</button>


</div>


)

}


export default Sidebar;