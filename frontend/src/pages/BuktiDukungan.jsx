import React, {useState} from "react";
import "./Page.css";


export default function BuktiDukungan(){


const [file,setFile]=useState(null);


const [form,setForm]=useState({

indikator:"",
nama:""

});



function handleChange(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}



async function handleSubmit(e){

e.preventDefault();


if(!file){

alert("Pilih file terlebih dahulu");

return;

}



const data = new FormData();


data.append(
"opd",
"Dinas Pendidikan"
);


data.append(
"indikator",
form.indikator
);


data.append(
"nama",
form.nama
);


data.append(
"file",
file
);



const response = await fetch(

"http://localhost:5000/api/bukti/upload",

{

method:"POST",

body:data

}

);



const result = await response.json();



alert(result.message);



}




return (

<div className="page-container">


<div className="page-header">

<h1>
📁 Upload Bukti Dukung
</h1>


<p>
Pengiriman dokumen pendukung IKPD
</p>


</div>




<div className="content-card">


<h2>
Form Upload Dokumen
</h2>



<form onSubmit={handleSubmit}>


<div className="form-group">

<label>
Indikator
</label>


<select
name="indikator"
onChange={handleChange}
>


<option>
-- Pilih Indikator --
</option>


<option>
Perencanaan
</option>


<option>
Monitoring dan Pengendalian
</option>


<option>
SOP
</option>


</select>


</div>





<div className="form-group">


<label>
Nama Dokumen
</label>


<input

name="nama"

placeholder="Contoh: Renstra OPD"

onChange={handleChange}

/>


</div>





<div className="form-group">


<label>
File Bukti Dukung
</label>


<input

type="file"

accept=".pdf,.doc,.docx"

onChange={(e)=>
setFile(e.target.files[0])
}

/>


</div>





<button
className="btn-save"
type="submit"
>

📤 Upload

</button>



</form>



</div>



</div>

);


}