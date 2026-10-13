import React,{
    useEffect,
    useState
} from "react";


import {
    Building2,
    Plus,
    Pencil,
    Trash2,
    Search
} from "lucide-react";


import "./OPD.css";



const API_BASE =
"http://localhost:5000";



export default function OPD(){


const [data,setData]=useState([]);

const [search,setSearch]=useState("");



const [form,setForm]=useState({

nama_opd:""

});



const [editId,setEditId]=useState(null);



useEffect(()=>{

loadData();

},[]);





function headers(){

return{

"Content-Type":"application/json",

Authorization:

`Bearer ${localStorage.getItem("token")}`

};

}





async function loadData(){


try{


const response=

await fetch(

`${API_BASE}/api/opd`

);



const result=

await response.json();



if(result.success){

setData(result.data);

}

else if(Array.isArray(result)){

setData(result);

}


}

catch(error){

console.log(error);

}


}







function change(e){

setForm({

...form,

[e.target.name]:

e.target.value


});

}







async function save(){


const url=

editId

?

`${API_BASE}/api/opd/${editId}`

:

`${API_BASE}/api/opd`;




const method=

editId

?

"PUT"

:

"POST";




await fetch(

url,

{

method,

headers:headers(),

body:

JSON.stringify(form)

}

);



reset();

loadData();


}







function edit(item){

setEditId(item.id);


setForm({

nama_opd:

item.nama_opd

});


}








async function remove(id){


if(!window.confirm(
"Hapus OPD?"
))

return;



await fetch(

`${API_BASE}/api/opd/${id}`,

{

method:"DELETE",

headers:headers()

}

);



loadData();


}





function reset(){

setEditId(null);


setForm({

nama_opd:""

});


}





const filtered=

data.filter(item=>

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

<Building2/>

 Data OPD

</h1>


<p>

Master perangkat daerah IKPD Online 2026

</p>


</div>


</div>






<div className="form-card">


<h2>

Tambah OPD

</h2>



<input

name="nama_opd"

placeholder="Nama OPD"

value={form.nama_opd}

onChange={change}

/>


<button

onClick={save}

>


<Plus size={18}/>

Simpan


</button>


</div>









<div className="table-card">


<div className="search-box">


<Search/>


<input

placeholder="Cari OPD"

value={search}

onChange={e=>

setSearch(e.target.value)

}

/>


</div>






<table>


<thead>

<tr>

<th>No</th>

<th>Nama OPD</th>

<th>Aksi</th>


</tr>


</thead>



<tbody>


{

filtered.map((item,index)=>(


<tr key={item.id}>


<td>

{index+1}

</td>



<td>

{item.nama_opd}

</td>



<td>


<button

className="edit"

onClick={()=>edit(item)}

>

<Pencil/>

</button>



<button

className="delete"

onClick={()=>remove(item.id)}

>

<Trash2/>

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