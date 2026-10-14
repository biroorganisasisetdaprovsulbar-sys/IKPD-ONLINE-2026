import React, { useEffect, useState } from "react";


export default function Verifikasi(){


const [data,setData] = useState([]);

const [detail,setDetail] = useState(null);

const [loading,setLoading] = useState(true);



// ==========================
// AMBIL DATA
// ==========================

const getData = async()=>{

try{


const response = await fetch(
"http://localhost:5000/api/verifikasi"
);


const result = await response.json();


console.log(
"DATA VERIFIKASI",
result
);


setData(result);



}catch(error){

console.log(error);

setData([]);


}

finally{

setLoading(false);

}


};





useEffect(()=>{


getData();


},[]);







// ==========================
// UPDATE STATUS
// ==========================


const updateStatus = async(status)=>{


try{


console.log(
"UPDATE",
detail.id,
status
);



const response = await fetch(

`http://localhost:5000/api/verifikasi/${detail.id}`,

{

method:"PUT",

headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({

status:status


})


}


);



const result = await response.json();



console.log(result);



alert(
"Status berhasil diperbarui"
);



setDetail(null);



getData();



}
catch(error){

console.log(error);

alert(
"Gagal update status"
);


}


};






return (

<div className="container">


<div className="card">


<h1>
Verifikasi IKPD
</h1>


<p>
Validasi hasil evaluasi Indeks Kematangan Perangkat Daerah
</p>


</div>





<table width="100%" border="0">


<thead>


<tr>


<th>
OPD
</th>


<th>
Nilai IKPD
</th>


<th>
Status
</th>


<th>
Aksi
</th>


</tr>


</thead>




<tbody>



{

loading &&


<tr>

<td colSpan="4">

Loading...

</td>

</tr>


}





{

!loading && data.length===0 &&


<tr>

<td colSpan="4">

Data verifikasi belum tersedia

</td>

</tr>


}




{

data.map((item)=>(


<tr key={item.id}>


<td>

{item.nama_opd}

</td>



<td>

{
item.nilai === null

?

"-"

:

item.nilai

}

</td>



<td>


<span>


{item.status}


</span>


</td>




<td>


<button

onClick={()=>setDetail(item)}

>

Detail

</button>


</td>



</tr>



))


}





</tbody>



</table>






{

detail &&


<div className="detail-box">


<h2>
Detail Evaluasi
</h2>



<h3>

{detail.nama_opd}

</h3>



<p>

Nilai IKPD :

{detail.nilai ?? "-"}

</p>



<p>

Status :

{detail.status}

</p>





<button

style={{
background:"green",
color:"white",
marginRight:"10px"
}}


onClick={()=>updateStatus(
"Disetujui"
)}

>

✓ Setujui

</button>





<button


style={{
background:"red",
color:"white",
marginRight:"10px"
}}


onClick={()=>updateStatus(
"Revisi"
)}

>

✕ Kembalikan

</button>





<button

onClick={()=>setDetail(null)}

>

Tutup

</button>



</div>


}




</div>


);


}