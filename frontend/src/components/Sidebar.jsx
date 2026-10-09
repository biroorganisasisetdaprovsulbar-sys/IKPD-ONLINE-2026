import {NavLink} from "react-router-dom";


export default function Sidebar(){


const menus=[

["/dashboard","🏠","Dashboard"],
["/opd","🏢","Data OPD"],
["/penilaian","📊","Penilaian"],
["/bukti","📁","Bukti Dukungan"],
["/laporan","📄","Laporan"],
["/pengguna","👥","Pengguna"]

];


return(

<div className="sidebar">


<div className="brand">

<img src="/logo-sulbar.png"/>


<div>

<h2>IKPD</h2>

<span>
ONLINE 2026
</span>

</div>

</div>


<div className="admin">

👤 Administrator

<small>
Admin Sistem
</small>

</div>


{
menus.map((m)=>(

<NavLink

key={m[0]}

to={m[0]}

className={({isActive})=>
isActive?"item active":"item"
}

>

<span>
{m[1]}
</span>

{m[2]}


</NavLink>


))

}


<button className="logout">
Keluar
</button>


</div>


)

}
