import React, {useState, useEffect} from "react";


export default function Indikator(){


const dataAwal=[

{
id:1,
kode:"IKPD-01",
nama:"Perencanaan Pembangunan Daerah",
kategori:"Tata Kelola",
bobot:20
},

{
id:2,
kode:"IKPD-02",
nama:"Pelayanan Publik Digital",
kategori:"SPBE",
bobot:30
},

{
id:3,
kode:"IKPD-03",
nama:"Manajemen Kinerja OPD",
kategori:"Kinerja",
bobot:50
}

];



const [indikator,setIndikator]=useState([]);



const [form,setForm]=useState({

id:null,
kode:"",
nama:"",
kategori:"",
bobot:""

});


const [edit,setEdit]=useState(false);




// LOAD DATA

useEffect(()=>{


const data =
localStorage.getItem("indikator");


if(data){

setIndikator(
JSON.parse(data)
);


}else{


setIndikator(dataAwal);


localStorage.setItem(

"indikator",

JSON.stringify(dataAwal)

);


}


},[]);






function simpan(){


if(

form.kode==="" ||

form.nama==="" ||

form.kategori==="" ||

form.bobot===""

){


alert(
"Semua data indikator harus diisi"
);


return;

}



let hasil;



if(edit){


hasil = indikator.map(

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

...indikator,

{

...form,

id:Date.now(),

bobot:Number(form.bobot)

}

];


}



setIndikator(hasil);



localStorage.setItem(

"indikator",

JSON.stringify(hasil)

);



setForm({

id:null,
kode:"",
nama:"",
kategori:"",
bobot:""

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
"Hapus indikator?"
)

){


const hasil=

indikator.filter(

item=>

item.id!==id

);



setIndikator(hasil);



localStorage.setItem(

"indikator",

JSON.stringify(hasil)

);


}


}






return(


<div className="container">


<div className="card">



<h1>
Indikator IKPD
</h1>


<p>
Kelola indikator penilaian kematangan perangkat daerah
</p>





<div className="form-box">



<input

placeholder="Kode Indikator"

value={form.kode}

onChange={

e=>

setForm({

...form,

kode:e.target.value

})

}

/>





<input

placeholder="Nama Indikator"

value={form.nama}

onChange={

e=>

setForm({

...form,

nama:e.target.value

})

}

/>





<input

placeholder="Kategori"

value={form.kategori}

onChange={

e=>

setForm({

...form,

kategori:e.target.value

})

}

/>





<input

type="number"

placeholder="Bobot"

value={form.bobot}

onChange={

e=>

setForm({

...form,

bobot:e.target.value

})

}

/>





<button

onClick={simpan}

>


{

edit

?

"Update Indikator"

:

"Tambah Indikator"

}


</button>



</div>







<table>


<thead>

<tr>


<th>No</th>

<th>Kode</th>

<th>Indikator</th>

<th>Kategori</th>

<th>Bobot</th>

<th>Aksi</th>


</tr>


</thead>




<tbody>


{

indikator.map(

(item,index)=>(


<tr key={item.id}>


<td>
{index+1}
</td>


<td>
{item.kode}
</td>


<td>
{item.nama}
</td>


<td>
{item.kategori}
</td>


<td>
{item.bobot}%
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
