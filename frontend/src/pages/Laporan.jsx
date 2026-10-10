import React,{useState,useEffect} from "react";


export default function Laporan(){


const [data,setData]=useState([]);


const [tahun,setTahun]=useState("2026");

const [opd,setOpd]=useState("Semua OPD");




useEffect(()=>{


const nilai =
JSON.parse(
localStorage.getItem("penilaian")
)
|| [];


setData(nilai);


},[]);





function statusNilai(nilai){


if(nilai>=90){

return "Sangat Baik";

}


if(nilai>=75){

return "Baik";

}


if(nilai>=60){

return "Cukup";

}


return "Perlu Perbaikan";


}






return(

<div className="page-container">



<div className="page-title">

<h1>
📑 Laporan IKPD
</h1>


<p>
Rekapitulasi hasil evaluasi kinerja OPD IKPD ONLINE 2026
</p>


</div>





<div className="card">


<h2>
🔎 Filter Laporan
</h2>



<div className="form-grid">



<select

value={tahun}

onChange={
e=>setTahun(e.target.value)
}

>

<option>
2026
</option>

<option>
2027
</option>


</select>





<select

value={opd}

onChange={
e=>setOpd(e.target.value)
}

>


<option>
Semua OPD
</option>


{

[...new Set(
data.map(
item=>item.opd
)
)]

.map(
(item,index)=>(

<option key={index}>
{item}
</option>

)

)


}



</select>




</div>



<div className="button-area">


<button className="btn-primary">

🔍 Tampilkan

</button>


<button className="btn-reset">

📄 Export PDF

</button>


<button className="btn-reset">

📊 Export Excel

</button>


</div>



</div>







<div className="card table-card">


<h2>
📊 Rekap Penilaian OPD
</h2>




<table>


<thead>


<tr>

<th>No</th>

<th>OPD</th>

<th>Indikator</th>

<th>Nilai</th>

<th>Status</th>


</tr>


</thead>



<tbody>



{

data

.filter(

item=>

opd==="Semua OPD"

?

true

:

item.opd===opd

)

.map(

(item,index)=>(


<tr key={index}>


<td>
{index+1}
</td>


<td>
{item.opd}
</td>


<td>
{item.indikator}
</td>


<td>
{item.nilai}
</td>


<td>

{statusNilai(
item.nilai
)}

</td>


</tr>


)


)


}



</tbody>


</table>



</div>



</div>


);


}