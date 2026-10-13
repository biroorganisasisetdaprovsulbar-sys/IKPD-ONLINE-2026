import React,{
    useEffect,
    useState
} from "react";


import {
    Upload,
    FileText,
    Trash2,
    Eye
} from "lucide-react";


import "./BuktiDukung.css";



const API_BASE =
"http://localhost:5000";




export default function BuktiDukung(){



const [data,setData]=useState([]);


const [file,setFile]=useState(null);


const [form,setForm]=useState({

    indikator_id:"",
    keterangan:""

});



const [loading,setLoading]=useState(false);







useEffect(()=>{


loadData();


},[]);







function header(){


return{


Authorization:

`Bearer ${localStorage.getItem("token")}`


};


}







async function loadData(){


try{


const response =

await fetch(

`${API_BASE}/api/bukti`,

{

headers:header()

}

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


console.log(
error
);


}



}









function changeForm(e){


setForm({

...form,

[e.target.name]:

e.target.value


});


}









async function uploadFile(){



if(

!file ||

!form.indikator_id

){


alert(
"Lengkapi data dan pilih file"
);


return;


}





const formData =

new FormData();



formData.append(

"file",

file

);



formData.append(

"indikator_id",

form.indikator_id

);



formData.append(

"keterangan",

form.keterangan

);






try{


setLoading(true);



const response =

await fetch(

`${API_BASE}/api/bukti`,

{

method:"POST",

headers:header(),

body:formData

}

);





const result =

await response.json();



alert(
result.message
);



setFile(null);


setForm({

indikator_id:"",

keterangan:""

});


loadData();



}


catch(error){


console.log(error);


alert(
"Gagal upload dokumen"
);


}

finally{


setLoading(false);


}


}









async function hapus(id){



if(

!window.confirm(

"Hapus bukti dukung?"

)

)

return;





await fetch(

`${API_BASE}/api/bukti/${id}`,

{

method:"DELETE",

headers:header()

}

);



loadData();



}









return(



<div className="bukti-page">





<div className="page-header">


<div>


<h1>

📁 Bukti Dukung IKPD

</h1>


<p>

Upload dan kelola dokumen pendukung evaluasi

</p>


</div>


</div>









<div className="upload-card">


<h2>

Upload Dokumen

</h2>






<div className="form-grid">


<input

name="indikator_id"

placeholder="ID Indikator"

value={form.indikator_id}

onChange={changeForm}

/>





<input

name="keterangan"

placeholder="Keterangan dokumen"

value={form.keterangan}

onChange={changeForm}

/>





<input

type="file"

onChange={e=>

setFile(
e.target.files[0]
)

}

/>



</div>





<button

className="upload-button"

onClick={uploadFile}

disabled={loading}

>


<Upload size={18}/>


{

loading

?

"Mengupload..."

:

"Upload Bukti"

}



</button>



</div>









<div className="table-card">



<h2>

Daftar Bukti Dukung

</h2>





<table>


<thead>


<tr>

<th>
No
</th>

<th>
Indikator
</th>


<th>
Keterangan
</th>


<th>
File
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

data.length===0

?


<tr>

<td colSpan="6">

Belum ada dokumen

</td>

</tr>


:


data.map((item,index)=>(



<tr key={item.id}>


<td>

{index+1}

</td>




<td>

{item.indikator_id}

</td>




<td>

{item.keterangan}

</td>




<td>


<a

href={item.file}

target="_blank"

rel="noreferrer"

>


<Eye size={18}/>

</a>



</td>




<td>


<span className="status">

{item.status || "Menunggu"}

</span>



</td>




<td>


<button

className="delete"

onClick={()=>hapus(item.id)}

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