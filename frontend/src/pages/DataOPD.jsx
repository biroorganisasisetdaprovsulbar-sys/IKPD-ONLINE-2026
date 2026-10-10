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

const simpan=
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



function handleSave(){


if(
!form.nama ||
!form.kode ||
!form.kepala
){

alert("Lengkapi data OPD");
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
"opd",
JSON.stringify(hasil)
);


resetForm();

}




function resetForm(){

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

if(confirm("Hapus OPD?")){


const hasil=data.filter(
item=>item.id!==id
);


setData(hasil);


localStorage.setItem(
"opd",
JSON.stringify(hasil)
);


}

}




return (

<div className="page-container">


<div className="page-title">

<h1>
📋 Data OPD
</h1>

<p>
Kelola data organisasi perangkat daerah IKPD ONLINE 2026
</p>


</div>



<div className="card">


<h2>
➕ {edit ? "Edit OPD":"Tambah Data OPD"}
</h2>



<div className="form-grid">


<input

placeholder="Nama OPD"

value={form.nama}

onChange={
e=>setForm({
...form,
nama:e.target.value
})
}

/>



<input

placeholder="Kode OPD"

value={form.kode}

onChange={
e=>setForm({
...form,
kode:e.target.value
})
}

/>




<input

placeholder="Kepala OPD"

value={form.kepala}

onChange={
e=>setForm({
...form,
kepala:e.target.value
})
}

/>


</div>



<div className="button-area">


<button
className="btn-primary"
onClick={handleSave}
>

💾 {edit?"Update":"Simpan"}

</button>



<button
className="btn-reset"
onClick={resetForm}
>

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


{
data.map((item,index)=>(

<tr key={item.id}>


<td>{index+1}</td>

<td>{item.nama}</td>

<td>{item.kode}</td>

<td>{item.kepala}</td>


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