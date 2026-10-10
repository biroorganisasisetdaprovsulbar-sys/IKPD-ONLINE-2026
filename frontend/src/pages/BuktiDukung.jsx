import React,{useState,useEffect} from "react";


export default function BuktiDukung(){


const [data,setData]=useState([]);


const [form,setForm]=useState({

id:null,
opd:"",
indikator:"",
dokumen:"",
file:"",
keterangan:"",
status:"Menunggu Verifikasi"

});


const [edit,setEdit]=useState(false);



useEffect(()=>{


const simpan =
localStorage.getItem("bukti");


if(simpan){

setData(JSON.parse(simpan));

}


},[]);





function simpanData(){


if(
!form.opd ||
!form.indikator ||
!form.dokumen
){

alert("Lengkapi data bukti dukung");

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
"bukti",
JSON.stringify(hasil)
);



reset();


}




function editData(item){

setForm(item);

setEdit(true);

}




function hapus(id){


if(confirm("Hapus dokumen?")){


const hasil=data.filter(
item=>item.id!==id
);



setData(hasil);


localStorage.setItem(
"bukti",
JSON.stringify(hasil)
);


}

}





function reset(){


setForm({

id:null,
opd:"",
indikator:"",
dokumen:"",
file:"",
keterangan:"",
status:"Menunggu Verifikasi"

});


setEdit(false);


}





return(

<div className="page-container">



<div className="page-title">


<h1>
📁 Bukti Dukung IKPD
</h1>


<p>
Kelola dokumen pendukung evaluasi OPD IKPD ONLINE 2026
</p>


</div>





<div className="card">


<h2>
➕ {edit?"Edit Bukti Dukung":"Tambah Bukti Dukung"}
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

placeholder="Nama Dokumen"

value={form.dokumen}

onChange={
e=>setForm({
...form,
dokumen:e.target.value
})
}

/>




<input

type="file"

onChange={
e=>setForm({
...form,
file:e.target.files[0]?.name
})
}

/>



<input

placeholder="Keterangan"

value={form.keterangan}

onChange={
e=>setForm({
...form,
keterangan:e.target.value
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
📋 Daftar Bukti Dukung
</h2>



<table>


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
{item.dokumen}
</td>


<td>

<span>
{item.status}
</span>

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