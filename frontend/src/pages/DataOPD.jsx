import React, {useState, useEffect} from "react";


export default function DataOPD(){


const defaultData=[
{
id:1,
nama:"Dinas Pendidikan",
kode:"DISDIK",
kepala:"Kepala Dinas Pendidikan"
},
{
id:2,
nama:"Dinas Kesehatan",
kode:"DINKES",
kepala:"Kepala Dinas Kesehatan"
}
];


const [data,setData]=useState([]);

const [form,setForm]=useState({
id:null,
nama:"",
kode:"",
kepala:""
});


const [edit,setEdit]=useState(false);



useEffect(()=>{

let simpan=
localStorage.getItem("opd");


if(simpan){

setData(JSON.parse(simpan));

}else{

setData(defaultData);

localStorage.setItem(
"opd",
JSON.stringify(defaultData)
);

}


},[]);



function simpan(){


if(
form.nama==="" ||
form.kode==="" ||
form.kepala===""
){

alert("Lengkapi data OPD");

return;

}

return (

<div className="page-container">


<div className="page-title">
<h1>📋 Data OPD</h1>
<p>Kelola data organisasi perangkat daerah IKPD ONLINE 2026</p>
</div>



<div className="card">


<h2>
➕ Tambah Data OPD
</h2>


<div className="form-grid">


<input
placeholder="Nama OPD"
/>


<input
placeholder="Kode OPD"
/>


<input
placeholder="Kepala OPD"
/>


</div>


<div className="button-area">

<button className="btn-primary">
💾 Simpan
</button>


<button className="btn-reset">
↻ Reset
</button>

</div>


</div>




<div className="card table-card">


<h2>
📋 Daftar OPD
</h2>


<table>

<thead>

<tr>

<th>No</th>

<th>Nama OPD</th>

<th>Kode</th>

<th>Kepala</th>

<th>Aksi</th>


</tr>

</thead>


<tbody>


{dataOPD.map((item,index)=>(


<tr key={item.id}>


<td>
{index+1}
</td>


<td>
{item.nama}
</td>


<td>
{item.kode}
</td>


<td>
{item.kepala}
</td>



<td>


<button className="btn-edit">
✏️
</button>


<button className="btn-delete">
🗑
</button>


</td>


</tr>


))}


</tbody>


</table>


</div>



</div>

)

let hasil;


if(edit){


hasil=data.map(
x=>
x.id===form.id
?
form
:
x
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
"opd",
JSON.stringify(hasil)
);



setForm({
id:null,
nama:"",
kode:"",
kepala:""
});


setEdit(false);


}




function editData(item){

setForm(item);

setEdit(true);

}




function hapus(id){


if(
confirm("Hapus OPD?")
){

let hasil=data.filter(
x=>x.id!==id
);


setData(hasil);


localStorage.setItem(
"opd",
JSON.stringify(hasil)
);


}

}





return (

<div className="container">

<div className="card">


<h1>
Data OPD
</h1>



<div>


<input

placeholder="Nama OPD"

value={form.nama}

onChange={
e=>
setForm({
...form,
nama:e.target.value
})
}

/>



<input

placeholder="Kode OPD"

value={form.kode}

onChange={
e=>
setForm({
...form,
kode:e.target.value
})
}

/>



<input

placeholder="Kepala OPD"

value={form.kepala}

onChange={
e=>
setForm({
...form,
kepala:e.target.value
})
}

/>


<button onClick={simpan}>

{
edit
?
"Update"
:
"Tambah"
}

</button>


</div>




<table>


<thead>

<tr>

<th>No</th>

<th>Nama OPD</th>

<th>Kode</th>

<th>Kepala</th>

<th>Aksi</th>

</tr>


</thead>



<tbody>


{

data.map(
(item,index)=>(


<tr key={item.id}>


<td>
{index+1}
</td>


<td>
{item.nama}
</td>


<td>
{item.kode}
</td>


<td>
{item.kepala}
</td>


<td>


<button
onClick={()=>editData(item)}
>
Edit
</button>


<button
onClick={()=>hapus(item.id)}
>
Hapus
</button>


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
