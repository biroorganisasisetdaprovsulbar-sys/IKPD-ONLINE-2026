import React,{useState,useEffect} from "react";


export default function Penilaian(){


const [opd,setOpd]=useState([]);

const [indikator,setIndikator]=useState([]);

const [nilai,setNilai]=useState([]);



const [form,setForm]=useState({

id:null,
opd:"",
indikator:"",
nilai:""

});


const [edit,setEdit]=useState(false);





useEffect(()=>{


const dataOPD=
localStorage.getItem("opd");


const dataIndikator=
localStorage.getItem("indikator");


const dataNilai=
localStorage.getItem("penilaian");



if(dataOPD){

setOpd(
JSON.parse(dataOPD)
);

}



if(dataIndikator){

setIndikator(
JSON.parse(dataIndikator)
);

}



if(dataNilai){

setNilai(
JSON.parse(dataNilai)
);

}



},[]);







function simpan(){


if(

form.opd==="" ||

form.indikator==="" ||

form.nilai===""

){

alert(
"Lengkapi data penilaian"
);

return;

}



let hasil;



if(edit){


hasil =
nilai.map(

item=>

item.id===form.id

?

form

:

item

);


}

else{


hasil=[

...nilai,

{

...form,

id:Date.now(),

nilai:Number(form.nilai)

}

];


}




setNilai(hasil);


localStorage.setItem(

"penilaian",

JSON.stringify(hasil)

);



setForm({

id:null,
opd:"",
indikator:"",
nilai:""

});


setEdit(false);



}






function editData(item){


setForm(item);

setEdit(true);


}




function hapus(id){


if(

confirm(
"Hapus nilai penilaian?"
)

){


const hasil=

nilai.filter(

item=>

item.id!==id

);



setNilai(hasil);


localStorage.setItem(

"penilaian",

JSON.stringify(hasil)

);


}


}






return(


<div className="container">


<div className="card">



<h1>
Penilaian IKPD
</h1>


<p>
Input nilai kematangan perangkat daerah
</p>





<div className="form-box">



<select

value={form.opd}

onChange={

e=>

setForm({

...form,

opd:e.target.value

})

}

>


<option value="">

Pilih OPD

</option>



{

opd.map(

item=>(

<option

key={item.id}

>

{item.nama}

</option>

)

)

}



</select>






<select

value={form.indikator}

onChange={

e=>

setForm({

...form,

indikator:e.target.value

})

}

>


<option value="">

Pilih Indikator

</option>



{

indikator.map(

item=>(

<option

key={item.id}

>

{item.nama}

</option>


)

)

}



</select>







<input

type="number"

min="0"

max="100"

placeholder="Nilai 0 - 100"

value={form.nilai}

onChange={

e=>

setForm({

...form,

nilai:e.target.value

})

}

/>





<button

onClick={simpan}

>


{

edit

?

"Update Nilai"

:

"Simpan Nilai"

}


</button>



</div>








<table>


<thead>

<tr>


<th>No</th>

<th>OPD</th>

<th>Indikator</th>

<th>Nilai</th>

<th>Aksi</th>


</tr>


</thead>




<tbody>


{

nilai.map(

(item,index)=>(


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

{item.nilai}

</td>



<td>


<button

onClick={

()=>editData(item)

}

>

Edit

</button>



<button

onClick={

()=>hapus(item.id)

}

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




</div>


</div>


);


}
