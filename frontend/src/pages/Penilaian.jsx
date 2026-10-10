import React,{useState,useEffect} from "react";


export default function Penilaian(){


const [data,setData]=useState([]);


const [form,setForm]=useState({

id:null,
opd:"",
indikator:"",
nilai:"",
catatan:""

});


const [edit,setEdit]=useState(false);



useEffect(()=>{


const simpan=
localStorage.getItem("penilaian");


if(simpan){

setData(JSON.parse(simpan));

}


},[]);




function simpanData(){


if(
!form.opd ||
!form.indikator ||
!form.nilai
){

alert("Lengkapi data penilaian");

return;

}



let hasil;



if(edit){


hasil=data.map(item=>

item.id===form.id

?

form

:

item

);


}else{


hasil=[

...data,

{

...form,

id:Date.now()

}

];


}



setData(hasil);


localStorage.setItem(
"penilaian",
JSON.stringify(hasil)
);



reset();


}





function editData(item){

setForm(item);

setEdit(true);

}




function hapus(id){


if(confirm("Hapus penilaian?")){


const hasil=data.filter(
item=>item.id!==id
);


setData(hasil);


localStorage.setItem(
"penilaian",
JSON.stringify(hasil)
);


}


}




function reset(){

setForm({

id:null,
opd:"",
indikator:"",
nilai:"",
catatan:""

});


setEdit(false);


}




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
📊 Penilaian IKPD
</h1>

<p>
Kelola hasil evaluasi kinerja OPD IKPD ONLINE 2026
</p>

</div>





<div className="card">


<h2>
➕ {edit?"Edit Penilaian":"Input Penilaian"}
</h2>



<div className="form-grid">


<input

placeholder="OPD"

value={form.opd}

onChange={
e=>setForm({
...form,
opd:e.target.value
})
}

/>



<input

placeholder="Indikator"

value={form.indikator}

onChange={
e=>setForm({
...form,
indikator:e.target.value
})
}

/>




<input

type="number"

placeholder="Nilai (0-100)"

value={form.nilai}

onChange={
e=>setForm({
...form,
nilai:e.target.value
})
}

/>



<input

placeholder="Catatan"

value={form.catatan}

onChange={
e=>setForm({
...form,
catatan:e.target.value
})
}

/>


</div>




<div className="button-area">


<button

className="btn-primary"

onClick={simpanData}

>

💾 {edit?"Update":"Simpan"}

</button>



<button

className="btn-reset"

onClick={reset}

>

↻ Reset

</button>


</div>



</div>






<div className="card table-card">


<h2>
📋 Daftar Penilaian
</h2>




<table>


<thead>

<tr>

<th>No</th>

<th>OPD</th>

<th>Indikator</th>

<th>Nilai</th>

<th>Status</th>

<th>Catatan</th>

<th>Aksi</th>


</tr>

</thead>



<tbody>


{

data.map((item,index)=>(


<tr key={item.id}>


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

<span>

{statusNilai(item.nilai)}

</span>


</td>


<td>
{item.catatan}
</td>


<td>


<button

className="btn-edit"

onClick={()=>editData(item)}

>

✏️

</button>



<button

className="btn-delete"

onClick={()=>hapus(item.id)}

>

🗑

</button>



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