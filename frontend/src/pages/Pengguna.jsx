import React, { useState } from "react";
import "./Pengguna.css";


export default function Pengguna(){


const daftarOPD = JSON.parse(
localStorage.getItem("opd")
) || [];



const [users,setUsers] = useState(
JSON.parse(localStorage.getItem("users")) || [
{
nama:"Administrator",
opd:"-",
username:"admin",
status:"Aktif",
role:"Administrator"
}
]
);

const [editMode,setEditMode] = useState(false);
const [editId,setEditId] = useState(null);

const handleEdit = (user)=>{

setEditMode(true);

setEditId(user.id);


setForm({

nama:user.nama,

opd:user.opd,

username:user.username,

password:"",

role:user.role

});


};

const handleSubmit=(e)=>{

e.preventDefault();


if(editMode){


const updateData=userList.map((item)=>

item.id===editId

?

{
...item,
...form
}

:

item

);


setUserList(updateData);


setEditMode(false);

setEditId(null);


}

else{


setUserList([

...userList,

{

id:Date.now(),

...form

}

]);


}


resetForm();


};

const [form,setForm] = useState({

nama:"",
opd:"",
username:"",
password:"",
role:"Operator OPD"

});





function handleChange(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}





function simpanUser(e){

e.preventDefault();


if(
!form.nama ||
!form.opd ||
!form.username ||
!form.password
){

alert("Data belum lengkap");
return;

}



const userBaru={

nama:form.nama,

opd:form.opd,

username:form.username,

status:"Aktif",

role:form.role

};



const data=[

...users,

userBaru

];



setUsers(data);


localStorage.setItem(
"users",
JSON.stringify(data)
);



resetForm();


}





function resetForm(){


setForm({

nama:"",
opd:"",
username:"",
password:"",
role:"Operator OPD"

});


}




function hapusUser(index){


if(
window.confirm(
"Hapus akun ini?"
)
){


const data=users.filter(
(_,i)=>i!==index
);



setUsers(data);



localStorage.setItem(
"users",
JSON.stringify(data)
);



}


}





return(

<div className="pengguna-page">



<h1>
👥 Manajemen Pengguna
</h1>



<p>
Kelola akun administrator dan operator OPD IKPD ONLINE 2026
</p>





<div className="form-card">



<h2>
➕ Tambah Operator OPD
</h2>




<form onSubmit={simpanUser}>


<div className="pengguna-grid">



<div>

<label>
Nama Operator
</label>


<input

type="text"

name="nama"

value={form.nama}

onChange={handleChange}

placeholder="Masukkan nama operator"

/>

</div>





<div>

<label>
OPD
</label>



<select

name="opd"

value={form.opd}

onChange={handleChange}

>


<option value="">
-- Pilih OPD --
</option>



{

daftarOPD.map(

(item,index)=>(


<option key={index}>

{
item.nama || item
}

</option>


)

)

}



</select>


</div>






<div>

<label>
Username
</label>


<input

type="text"

name="username"

value={form.username}

onChange={handleChange}

placeholder="Username"

/>


</div>






<div>

<label>
Password
</label>


<input

type="password"

name="password"

value={form.password}

onChange={handleChange}

placeholder="Password"

/>


</div>







<div>

<label>
Role
</label>


<input

type="text"

value="Operator OPD"

disabled

/>


</div>



</div>





<div className="button-area">


<button 
className="btn-save"
>

{
editMode 
? "✏️ Update"
: "💾 Simpan"
}

</button>



<button

type="button"

className="btn-reset"

onClick={resetForm}

>

↻ Reset

</button>



</div>



</form>



</div>







<div className="table-card">



<h2>
📋 Daftar Akun Operator
</h2>




<table>


<thead>

<tr>

<th>No</th>

<th>Nama</th>

<th>OPD</th>

<th>Username</th>

<th>Status</th>

<th>Aksi</th>


</tr>

</thead>




<tbody>



{

users.map(

(user,index)=>(


<tr key={index}>


<td>
{index+1}
</td>


<td>
{user.nama}
</td>


<td>
{user.opd}
</td>


<td>
{user.username}
</td>


<td>
{user.status}
</td>


<td>


<button

className="btn-edit"

onClick={()=>handleEdit(user)}

>

✏️

</button>



<button

className="btn-delete"

>

🗑

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