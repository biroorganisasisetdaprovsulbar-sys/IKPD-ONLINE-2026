import React,{
    useEffect,
    useState
} from "react";


import {
    Search,
    UserPlus,
    Pencil,
    Trash2
} from "lucide-react";


import "./Pengguna.css";



const API_BASE =
"http://localhost:5000";





export default function Pengguna(){



const [users,setUsers]=useState([]);


const [search,setSearch]=useState("");



const [form,setForm]=useState({

    nama:"",
    username:"",
    role:"OPD",
    status:"Aktif"

});



const [editId,setEditId]=useState(null);



useEffect(()=>{


loadUsers();


},[]);








function headers(){


return{

"Content-Type":"application/json",

Authorization:

`Bearer ${localStorage.getItem("token")}`

};


}








async function loadUsers(){


try{


const response =

await fetch(

`${API_BASE}/api/users`,

{

headers:headers()

}

);



const result =

await response.json();





if(result.success){


setUsers(
result.data
);


}
else if(Array.isArray(result)){


setUsers(result);


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



const url = editId

?

`${API_BASE}/api/users/${editId}`

:

`${API_BASE}/api/users`;





const method = editId

?

"PUT"

:

"POST";






try{


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


loadUsers();



}

catch(error){


console.log(error);


}


}









async function remove(id){



if(

!window.confirm(

"Hapus pengguna?"

)

)

return;




await fetch(

`${API_BASE}/api/users/${id}`,

{

method:"DELETE",

headers:headers()

}

);



loadUsers();


}









function edit(item){



setEditId(item.id);



setForm({

nama:item.nama,

username:item.username,

role:item.role,

status:item.status


});


}







function reset(){


setEditId(null);



setForm({

nama:"",

username:"",

role:"OPD",

status:"Aktif"

});


}







const filtered =

users.filter(item=>

item.nama

.toLowerCase()

.includes(

search.toLowerCase()

)

);









return(



<div className="pengguna-page">





<div className="page-header">


<div>


<h1>

👥 Manajemen Pengguna

</h1>


<p>

Kelola akun pengguna IKPD Online 2026

</p>


</div>


</div>









<div className="form-card">


<h2>

{

editId

?

"✏️ Edit Pengguna"

:

"➕ Tambah Pengguna"

}

</h2>





<div className="form-grid">



<input

name="nama"

placeholder="Nama pengguna"

value={form.nama}

onChange={change}

/>




<input

name="username"

placeholder="Username"

value={form.username}

onChange={change}

/>






<select

name="role"

value={form.role}

onChange={change}

>


<option>

Administrator

</option>


<option>

Evaluator

</option>


<option>

OPD

</option>


</select>






<select

name="status"

value={form.status}

onChange={change}

>


<option>

Aktif

</option>


<option>

Nonaktif

</option>


</select>




</div>





<button

className="save-button"

onClick={save}

>


<UserPlus size={18}/>


Simpan Pengguna


</button>



</div>









<div className="table-card">





<div className="search-box">


<Search size={18}/>


<input

placeholder="Cari pengguna..."

value={search}

onChange={e=>

setSearch(e.target.value)

}

/>


</div>







<table>


<thead>


<tr>

<th>
No
</th>


<th>
Nama
</th>


<th>
Username
</th>


<th>
Role
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

filtered.map((item,index)=>(



<tr key={item.id}>


<td>

{index+1}

</td>


<td>

{item.nama}

</td>


<td>

{item.username}

</td>


<td>

<span className="role">

{item.role}

</span>

</td>



<td>

{item.status}

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