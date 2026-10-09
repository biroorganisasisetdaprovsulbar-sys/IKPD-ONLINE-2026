import React from "react";
import "./Dashboard.css";


function Dashboard(){


const opd = [
{
nama:"Dinas Kesehatan",
nilai:90,
status:"Sangat Baik"
},
{
nama:"Dinas Pendidikan",
nilai:75,
status:"Baik"
},
{
nama:"Bappeda",
nilai:65,
status:"Perlu Perbaikan"
},
{
nama:"Dinas PU",
nilai:80,
status:"Baik"
},
{
nama:"Dinas Sosial",
nilai:70,
status:"Perlu Perbaikan"
}
];



return (

<div className="dashboard">


<div className="header-dashboard">

<h1>
Dashboard IKPD ONLINE 2026
</h1>

<p>
Sistem Informasi Indeks Kematangan Perangkat Daerah
</p>

</div>




<div className="card-container">


<div className="card">

<h3>Total OPD</h3>

<h2>
{opd.length}
</h2>

</div>



<div className="card">

<h3>Rata-rata</h3>

<h2>
76
</h2>

</div>



<div className="card green">

<h3>Tertinggi</h3>

<h2>
90
</h2>

</div>



<div className="card red">

<h3>Terendah</h3>

<h2>
65
</h2>

</div>



</div>





<div className="chart-container">


<div className="chart-box">


<h2>
Grafik Nilai OPD
</h2>


<div className="bars">


{
opd.map((item,index)=>(


<div className="bar-item" key={index}>


<div 
className="bar"
style={{
height:`${item.nilai*3}px`
}}
>


</div>


<span>
{item.nilai}
</span>


<p>
{item.nama}
</p>


</div>


))

}



</div>


</div>







<div className="pie-box">


<h2>
Status Evaluasi
</h2>


<div className="pie">


</div>


<div className="legend">


<p>🟢 Sangat Baik</p>

<p>🟡 Baik</p>

<p>🔴 Perlu Perbaikan</p>


</div>


</div>



</div>







<div className="table-box">


<h2>
Daftar Nilai OPD
</h2>


<table>


<thead>

<tr>

<th>No</th>

<th>OPD</th>

<th>Nilai</th>

<th>Status</th>


</tr>

</thead>



<tbody>


{

opd.map((item,index)=>(


<tr key={index}>


<td>
{index+1}
</td>


<td>
{item.nama}
</td>


<td>
{item.nilai}
</td>


<td>
{item.status}
</td>


</tr>



))


}


</tbody>


</table>



</div>



</div>


);


}


export default Dashboard;