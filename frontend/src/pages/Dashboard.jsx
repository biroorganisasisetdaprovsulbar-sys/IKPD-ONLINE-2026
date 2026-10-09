import React from "react";
import { Link } from "react-router-dom";


function Dashboard(){

return (

<div style={styles.container}>


<div style={styles.sidebar}>

<h2>IKPD</h2>
<p>ONLINE 2026</p>

<hr/>


<Link style={styles.menu} to="/">
🏠 Dashboard
</Link>


<Link style={styles.menu} to="/opd">
🏢 Data OPD
</Link>


<Link style={styles.menu} to="/indikator">
📄 Indikator IKPD
</Link>


<Link style={styles.menu} to="/penilaian">
📊 Penilaian
</Link>


<Link style={styles.menu} to="/bukti">
📁 Bukti Dukung
</Link>


<Link style={styles.menu} to="/laporan">
📑 Laporan
</Link>


<Link style={styles.menu} to="/pengguna">
👤 Pengguna
</Link>


</div>



<div style={styles.content}>


<div style={styles.header}>

<h1>Dashboard IKPD ONLINE 2026</h1>

<p>
Sistem Informasi Penilaian Indeks Kematangan Perangkat Daerah
</p>

</div>



<div style={styles.cards}>

<Card title="Total OPD" value="42"/>

<Card title="Indikator" value="100"/>

<Card title="Progress" value="65%"/>

<Card title="Status" value="Berjalan"/>

</div>



<div style={styles.panel}>

<h2>Monitoring Penilaian IKPD</h2>


<table width="100%">

<thead>

<tr>
<th>No</th>
<th>OPD</th>
<th>Status</th>
<th>Nilai</th>
</tr>

</thead>


<tbody>

<tr>
<td>1</td>
<td>Dinas Pendidikan</td>
<td>Selesai</td>
<td>86</td>
</tr>


<tr>
<td>2</td>
<td>Dinas Kesehatan</td>
<td>Proses</td>
<td>72</td>
</tr>


<tr>
<td>3</td>
<td>Bappeda</td>
<td>Belum</td>
<td>-</td>
</tr>


</tbody>

</table>


</div>


</div>


</div>

)

}



function Card({title,value}){

return (

<div style={styles.card}>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

)

}



const styles={

container:{
display:"flex",
minHeight:"100vh",
background:"#f3f6fa",
fontFamily:"Arial"
},


sidebar:{
width:"260px",
background:"#14558a",
color:"white",
padding:"25px"
},


menu:{
display:"block",
color:"white",
textDecoration:"none",
padding:"12px 0"
},


content:{
flex:1,
padding:"35px"
},


header:{
background:"#14558a",
color:"white",
padding:"35px",
borderRadius:"10px"
},


cards:{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
marginTop:"30px"
},


card:{
background:"white",
padding:"25px",
borderRadius:"10px"
},


panel:{
background:"white",
padding:"25px",
marginTop:"30px",
borderRadius:"10px"
}


}


export default Dashboard;
