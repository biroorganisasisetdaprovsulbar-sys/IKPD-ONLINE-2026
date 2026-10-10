import React, {useEffect, useState} from "react";
import "./Page.css";


export default function Verifikasi(){

const [data,setData]=useState([]);


const loadData=()=>{

fetch("http://localhost:5000/api/bukti")
.then(res=>res.json())
.then(result=>setData(result))
.catch(err=>console.log(err));

};



useEffect(()=>{

loadData();

},[]);



const updateStatus=(id,status)=>{


let catatan="";


if(status==="Ditolak"){
catatan=prompt("Masukkan alasan penolakan");
}


fetch(
`http://localhost:5000/api/bukti/${id}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
status,
catatan
})

}

)

.then(res=>res.json())
.then(()=>{

alert(
"Status berhasil diperbarui"
);

loadData();

});


};



return(

<div className="page">


<h1>
✅ Verifikasi Bukti Dukungan
</h1>

<p>
Pemeriksaan dokumen yang diinput oleh OPD
</p>



<div className="card">


<table className="table">

<thead>

<tr>

<th>No</th>
<th>OPD</th>
<th>Indikator</th>
<th>Dokumen</th>
<th>Status</th>
<th>Aksi</th>

</tr>

</thead>



<tbody>


{
data.map((item,index)=>(


<tr key={item.id}>


<td>{index+1}</td>


<td>
{item.opd}
</td>


<td>
{item.indikator}
</td>


<td>

<a
href={
`http://localhost:5000/uploads/${item.file_path}`
}

target="_blank">

📄 Lihat

</a>


</td>



<td>

<span className={
item.status==="Diterima"
?
"badge success"
:
item.status==="Ditolak"
?
"badge danger"
:
"badge warning"
}
>

{item.status}

</span>


</td>



<td>


<div className="aksi-verifikasi">

  <button
    className="btn-terima"
    onClick={() => updateStatus(item.id, "Diterima")}
  >
    ✅ Terima
  </button>

  <button
    className="btn-tolak"
    onClick={() => updateStatus(item.id, "Ditolak")}
  >
    ❌ Tolak
  </button>

</div>


</td>


</tr>


))

}


</tbody>


</table>


</div>


</div>


)


}