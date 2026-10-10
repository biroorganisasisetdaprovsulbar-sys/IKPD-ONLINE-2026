import React, {useState} from "react";
import "./Page.css";


export default function GantiPassword(){


const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");



function handleSubmit(e){

e.preventDefault();


if(newPassword !== confirmPassword){

alert("Password baru tidak sama");

return;

}


alert("Password berhasil diperbarui");


}



return (

<div className="page-container">


{/* HEADER */}

<div className="page-header">


<h1>

🔐 Ganti Password

</h1>


<p>

Perbarui password akun administrator agar tetap aman

</p>


</div>





{/* CARD */}

<div className="content-card password-card">



<h2>

🔑 Ubah Password Akun

</h2>




<form onSubmit={handleSubmit}>


<div className="form-group">


<label>
Password Lama
</label>


<input

type="password"

placeholder="Masukkan password lama"

value={oldPassword}

onChange={(e)=>setOldPassword(e.target.value)}

/>


</div>





<div className="form-group">


<label>
Password Baru
</label>


<input

type="password"

placeholder="Masukkan password baru"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

/>


</div>





<div className="form-group">


<label>
Konfirmasi Password Baru
</label>


<input

type="password"

placeholder="Ulangi password baru"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

/>


</div>






<div className="button-group">


<button 
className="btn-save"
type="submit"
>

💾 Simpan

</button>



<button

type="button"

className="btn-reset"

onClick={()=>{

setOldPassword("");
setNewPassword("");
setConfirmPassword("");

}}

>

↻ Reset

</button>


</div>



</form>



</div>




</div>

);


}