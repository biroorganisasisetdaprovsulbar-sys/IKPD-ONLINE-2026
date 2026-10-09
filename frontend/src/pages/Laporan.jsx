import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


function Laporan(){

const data = [
{
no:1,
opd:"Dinas Pendidikan",
status:"Selesai",
nilai:"86"
},
{
no:2,
opd:"Dinas Kesehatan",
status:"Proses",
nilai:"72"
},
{
no:3,
opd:"Bappeda",
status:"Belum",
nilai:"-"
}
];


const exportPDF = ()=>{

const doc = new jsPDF({
orientation:"landscape",
unit:"mm",
format:"a4"
});


const tanggal = new Date().toLocaleDateString(
"id-ID"
);


// HEADER

doc.setFontSize(18);
doc.text(
"IKPD ONLINE 2026",
14,
15
);


doc.setFontSize(12);

doc.text(
"Laporan Hasil Penilaian Indeks Kematangan Perangkat Daerah",
14,
23
);


doc.setFontSize(10);

doc.text(
"Dicetak tanggal : "+tanggal,
14,
30
);


// TABLE

autoTable(doc,{

startY:38,

head:[
[
"No",
"OPD",
"Status",
"Nilai"
]
],


body:data.map(item=>[
item.no,
item.opd,
item.status,
item.nilai
]),


theme:"grid",


headStyles:{
fillColor:[31,96,145],
textColor:255,
halign:"center"
},


styles:{
fontSize:11
},


columnStyles:{
0:{
halign:"center",
cellWidth:20
},

3:{
halign:"center",
cellWidth:30
}

}

});



// FOOTER

const halaman =
doc.internal.getNumberOfPages();


for(let i=1;i<=halaman;i++){

doc.setPage(i);


doc.setFontSize(9);


doc.text(
"IKPD ONLINE 2026 | Halaman "+i,
14,
200
);


}



doc.save(
"Laporan_IKPD_ONLINE_2026.pdf"
);


}



return(

<div className="container">

<div className="card">


<h1>
Laporan IKPD ONLINE 2026
</h1>


<p>
Export laporan hasil penilaian Indeks Kematangan Perangkat Daerah.
</p>


<button
onClick={exportPDF}
className="btn-primary"
>
📄 Export PDF
</button>



<table>

<thead>

<tr>
<th>No</th>
<th>OPD</th>
<th>Status</th>
<th>Nilai</th>
</tr>

</thead>


<tbody>

{
data.map((item)=>(

<tr key={item.no}>

<td>{item.no}</td>

<td>{item.opd}</td>

<td>{item.status}</td>

<td>{item.nilai}</td>

</tr>

))
}

</tbody>


</table>


</div>

</div>

)

}


export default Laporan;
