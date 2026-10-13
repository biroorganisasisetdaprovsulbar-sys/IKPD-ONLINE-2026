import React,{
    useEffect,
    useState
} from "react";


import {
    Plus,
    Pencil,
    Trash2,
    Search
} from "lucide-react";


import "./Indikator.css";



const API_BASE =
"http://localhost:5000";




export default function Indikator(){



const [data,setData]=useState([]);


const [search,setSearch]=useState("");



const [form,setForm]=useState({

    kode_indikator:"",
    nama_indikator:"",
    bobot:""

});



const [editId,setEditId]=useState(null);


const [loading,setLoading]=useState(false);





useEffect(()=>{


loadData();


},[]);





function header(){


return{


"Content-Type":"application/json",


Authorization:

`Bearer ${localStorage.getItem("token")}`


};


}







async function loadData(){


try{


const response =
await fetch(

`${API_BASE}/api/indikator`

);


const result =
await response.json();




if(result.success){


setData(
result.data
);


}
else if(Array.isArray(result)){


setData(result);


}


}

catch(error){


console.log(error);


}



}









function handleChange(e){


setForm({

...form,

[e.target.name]:

e.target.value


});


}








async function saveData(){



if(

!form.kode_indikator ||

!form.nama_indikator ||

!form.bobot

){


alert(
"Lengkapi data indikator"
);


return;


}




try{


setLoading(true);



const url = editId

?

`${API_BASE}/api/indikator/${editId}`

:

`${API_BASE}/api/indikator`;




const method = editId

?

"PUT"

:

"POST";





await fetch(

url,

{

method,

headers:header(),

body:

JSON.stringify(form)

}

);




reset();


loadData();



}

catch(error){


console.log(error);


}

finally{


setLoading(false);


}



}









function edit(item){



setEditId(
item.id
);



setForm({

kode_indikator:

item.kode_indikator,


nama_indikator:

item.nama_indikator,


bobot:

item.bobot


});


}









async function remove(id){



if(
!window.confirm(
"Hapus indikator?"
)

)

return;




await fetch(

`${API_BASE}/api/indikator/${id}`,

{

method:"DELETE",

headers:header()

}

);



loadData();



}









function reset(){


setEditId(null);



setForm({

kode_indikator:"",

nama_indikator:"",

bobot:""


});


}








const filtered =
data.filter(item=>

item.nama_indikator

.toLowerCase()

.includes(

search.toLowerCase()

)

);



const totalBobot =

data.reduce(

(total,item)=>

total+

Number(item.bobot||0)

,

0

);






return(



<div className="indikator-page">



<div className="page-header">


<div>

<h1>

📌 Master Indikator IKPD

</h1>


<p>

Kelola indikator evaluasi perangkat daerah tahun 2026

</p>


</div>


</div>






<div className="summary-indikator">


<div>


<span>

Jumlah Indikator

</span>


<strong>

{data.length}

</strong>


</div>




<div>


<span>

Total Bobot

</span>


<strong>

{totalBobot}%

</strong>


</div>


</div>









<div className="form-card">


<h2>

{editId ?

"✏️ Edit Indikator"

:

"➕ Tambah Indikator"

}

</h2>





<div className="form-grid">


<input

name="kode_indikator"

placeholder="Kode indikator"

value={form.kode_indikator}

onChange={handleChange}

/>



<input

name="nama_indikator"

placeholder="Nama indikator"

value={form.nama_indikator}

onChange={handleChange}

/>




<input

type="number"

name="bobot"

placeholder="Bobot (%)"

value={form.bobot}

onChange={handleChange}

/>


</div>




<div className="button-group">


<button

onClick={saveData}

disabled={loading}

>

<Plus size={18}/>

{

loading

?

"Menyimpan"

:

editId

?

"Update"

:

"Simpan"

}


</button>



<button

className="reset"

onClick={reset}

>

Reset

</button>


</div>



</div>









<div className="table-card">



<div className="search-box">


<Search size={18}/>


<input

placeholder="Cari indikator..."

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

<th>Kode</th>

<th>Indikator</th>

<th>Bobot</th>

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

{item.kode_indikator}

</td>



<td>

{item.nama_indikator}

</td>



<td>

{item.bobot}%

</td>




<td>



<button

className="edit"

onClick={()=>edit(item)}

>

<Pencil size={16}/>

</button>




<button

className="delete"

onClick={()=>remove(item.id)}

>

<Trash2 size={16}/>

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