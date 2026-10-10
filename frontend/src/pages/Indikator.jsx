import React,{useState,useEffect} from "react";


export default function Indikator(){


const defaultData=[

{
id:1,
nama:"Indeks Kinerja Pelayanan Publik",
kategori:"Pelayanan",
bobot:"30"
},

{
id:2,
nama:"Akuntabilitas Kinerja",
kategori:"Manajemen",
bobot:"40"
}

];



const [data,setData]=useState([]);


const [form,setForm]=useState({

id:null,
nama:"",
kategori:"",
bobot:""

});


const [edit,setEdit]=useState(false);



useEffect(()=>{


const simpan=
localStorage.getItem("indikator");


if(simpan){

setData(JSON.parse(simpan));

}else{

setData(defaultData);

localStorage.setItem(
"indikator",
JSON.stringify(defaultData)
);

}


},[]);




function simpanData(){


if(
!form.nama ||
!form.kategori ||
!form.bobot
){

alert("Lengkapi data indikator");

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
"indikator",
JSON.stringify(hasil)
);



reset();

}




function editData(item){


setForm(item);

setEdit(true);


}




function hapus(id){


if(confirm("Hapus indikator?")){


const hasil=data.filter(
item=>item.id!==id
);



setData(hasil);


localStorage.setItem(
"indikator",
JSON.stringify(hasil)
);


}


}




function reset(){


setForm({

id:null,
nama:"",
kategori:"",
bobot:""

});


setEdit(false);


}




return(

<div className="page-container">



<div className="page-title">

<h1>
📄 Indikator IKPD
</h1>

<p>
Kelola indikator kinerja perangkat daerah IKPD ONLINE 2026
</p>

</div>





<div className="card">


<h2>
➕ {edit?"Edit Indikator":"Tambah Indikator"}
</h2>



<div className="form-grid">



<input

placeholder="Nama Indikator"

value={form.nama}

onChange={
e=>setForm({
...form,
nama:e.target.value
})
}

/>



<input

placeholder="Kategori"

value={form.kategori}

onChange={
e=>setForm({
...form,
kategori:e.target.value
})
}

/>



<input

placeholder="Bobot (%)"

type="number"

value={form.bobot}

onChange={
e=>setForm({
...form,
bobot:e.target.value
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
📋 Daftar Indikator
</h2>




<table>


<thead>

<tr>

<th>No</th>

<th>Indikator</th>

<th>Kategori</th>

<th>Bobot</th>

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
{item.nama}
</td>


<td>
{item.kategori}
</td>


<td>
{item.bobot} %
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