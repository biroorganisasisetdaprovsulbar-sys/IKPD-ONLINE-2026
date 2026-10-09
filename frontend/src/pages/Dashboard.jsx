import React from "react";

function Dashboard(){

return (
<div style={{display:"flex",minHeight:"100vh",background:"#f3f6fa"}}>

{/* SIDEBAR */}
<div style={{
width:"260px",
background:"#14558a",
color:"white",
padding:"25px"
}}>

<h2>IKPD</h2>
<p>ONLINE 2026</p>

<hr/>

<p>🏠 Dashboard</p>
<p>🏢 Data OPD</p>
<p>📄 Indikator IKPD</p>
<p>📊 Penilaian</p>
<p>📁 Bukti Dukung</p>
<p>📑 Laporan</p>
<p>👤 Pengguna</p>

</div>


{/* CONTENT */}
<div style={{
flex:1,
padding:"35px"
}}>


<div style={{
background:"#14558a",
color:"white",
padding:"35px",
borderRadius:"10px"
}}>

<h1>Dashboard IKPD ONLINE 2026</h1>

<p>
Sistem Informasi Penilaian Indeks Kematangan Perangkat Daerah
</p>

</div>



<div style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
marginTop:"30px"
}}>


<Card title="Total OPD" value="42"/>

<Card title="Indikator" value="100"/>

<Card title="Progress" value="65%"/>

<Card title="Status" value="Berjalan"/>


</div>



<div style={{
background:"white",
padding:"25px",
marginTop:"30px",
borderRadius:"10px"
}}>

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

<div style={{
background:"white",
padding:"25px",
borderRadius:"10px"
}}>

<h3>{title}</h3>

<h1>{value}</h1>


</div>

)

}


export default Dashboard;
