import React,{
useEffect,
useState
} from "react";


import "./DataOPD.css";


const API_BASE =
"http://localhost:5000";



export default function DataOPD(){



const [opd,setOpd]=useState([]);

const [loading,setLoading]=useState(true);


const [search,setSearch]=useState("");



const [form,setForm]=useState({

nama_opd:"",
kode_opd:"",
tahun:"2026"

});



const [editId,setEditId]=useState(null);






useEffect(()=>{

loadOPD();

},[]);







function header(){


return {

"Content-Type":
"application/json",

Authorization:

`Bearer ${localStorage.getItem("token")}`

};


}









async function loadOPD(){


try{


const res =
await fetch(

`${API_BASE}/api/opd`,

{

headers:
header()

}

);



const data =
await res.json();



console.log(
"DATA OPD",
data
);



if(data.success){

setOpd(data.data);

}



}

catch(err){


console.log(err);


}

finally{


setLoading(false);


}


}










function inputChange(e){


setForm({

...form,

[e.target.name]:
e.target.value


});


}









async function simpan(){



try{


let url =
`${API_BASE}/api/opd`;



let method =
"POST";



if(editId){


url +=
`/${editId}`;


method =
"PUT";


}




const res =
await fetch(

url,

{

method,

headers:
header(),


body:

JSON.stringify(form)

}

);



const data =
await res.json();



alert(data.message);



setForm({

nama_opd:"",

kode_opd:"",

tahun:"2026"

});


setEditId(null);


loadOPD();



}



catch(error){


console.log(error);


}



}









function edit(item){


setForm({

nama_opd:item.nama_opd,

kode_opd:item.kode_opd,

tahun:item.tahun

});


setEditId(item.id);


}









async function hapus(id){


if(!window.confirm(
"Yakin hapus OPD?"
))

return;



await fetch(

`${API_BASE}/api/opd/${id}`,

{

method:"DELETE",

headers:
header()

}

);


loadOPD();


}









const filter =

opd.filter(item=>

item.nama_opd

.toLowerCase()

.includes(

search.toLowerCase()

)


);









return(


<div className="opd-page">



<div className="page-header">


<div>


<h1>
🏢 Data OPD
</h1>


<p>
Manajemen Perangkat Daerah IKPD 2026
</p>


</div>


</div>









<div className="form-card">


<h2>

{
editId

?

"Edit OPD"

:

"Tambah OPD"

}

</h2>





<div className="form-grid">



<input

name="nama_opd"

placeholder="Nama OPD"

value={form.nama_opd}

onChange={inputChange}

/>



<input

name="kode_opd"

placeholder="Kode OPD"

value={form.kode_opd}

onChange={inputChange}

/>



<input

name="tahun"

placeholder="Tahun"

value={form.tahun}

onChange={inputChange}

/>



<button

onClick={simpan}

>

{

editId

?

"Simpan Perubahan"

:

"Tambah OPD"

}


</button>



</div>


</div>









<div className="table-card">


<div className="table-header">


<h2>
Daftar OPD
</h2>



<input

placeholder="Cari OPD..."

value={search}

onChange={

e=>setSearch(e.target.value)

}

/>


</div>









{

loading

?

<p>
Memuat data...
</p>


:


<table>


<thead>

<tr>

<th>
No
</th>


<th>
Nama OPD
</th>


<th>
Kode
</th>


<th>
Tahun
</th>


<th>
Aksi
</th>


</tr>

</thead>





<tbody>



{

filter.map(

(item,index)=>(


<tr key={item.id}>


<td>
{index+1}
</td>


<td>
{item.nama_opd}
</td>


<td>
{item.kode_opd}
</td>


<td>
{item.tahun}
</td>


<td>


<button

className="edit"

onClick={()=>edit(item)}

>

Edit

</button>



<button

className="delete"

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



}



</div>







</div>


);



}