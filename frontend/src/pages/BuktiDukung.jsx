import React, {
    useEffect,
    useState
} from "react";


import {

UploadCloud,

FileText,

Eye,

Trash2

} from "lucide-react";


import "./BuktiDukung.css";





const BuktiDukung =()=>{


const [file,setFile]=useState(null);


const [dokumen,setDokumen]=useState([]);





useEffect(()=>{


loadDokumen();


},[]);





const loadDokumen=()=>{


fetch(

"http://localhost:5000/api/dokumen"

)


.then(res=>res.json())


.then(result=>{


setDokumen(

result.data || []

);


});


};







const uploadFile=()=>{


if(!file)

return;




const formData=

new FormData();


formData.append(

"file",

file

);




fetch(

"http://localhost:5000/api/dokumen/upload",

{

method:"POST",

body:formData

}

)


.then(()=>{


setFile(null);

loadDokumen();


});


};







const hapus=(id)=>{


fetch(

`http://localhost:5000/api/dokumen/${id}`,

{

method:"DELETE"

}

)

.then(()=>{


loadDokumen();


});


};






return(


<div className="dokumen-page">



<div className="dokumen-header">


<h1>

Bukti Dukung IKPD

</h1>


<p>

Upload dokumen pendukung evaluasi perangkat daerah

</p>


</div>







<div className="upload-box">


<UploadCloud size={45}/>


<h3>

Upload Dokumen

</h3>


<input


type="file"


onChange={

e=>

setFile(e.target.files[0])

}


/>



<button

onClick={uploadFile}

>

Upload

</button>



</div>









<div className="dokumen-list">


<h2>

Dokumen Saya

</h2>



<table>


<thead>

<tr>


<th>

Dokumen

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

dokumen.map(

(item,index)=>(


<tr key={index}>


<td>


<FileText size={18}/>


{item.nama_file}


</td>



<td>


<span className="status-doc">

{item.status}

</span>


</td>




<td>


<a

href={item.url}

target="_blank"

rel="noreferrer"

>

<Eye/>

</a>





<button

onClick={()=>hapus(item.id)}

>

<Trash2/>

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


};


export default BuktiDukung;