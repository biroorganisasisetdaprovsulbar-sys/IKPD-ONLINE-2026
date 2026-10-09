import {useState} from "react";


export default function BuktiDukung(){


const opdList =
JSON.parse(localStorage.getItem("opd")) || [];


const indikatorList =
JSON.parse(localStorage.getItem("indikator")) || [];



const [data,setData]=useState(()=>{

return JSON.parse(
localStorage.getItem("bukti")
) || [];

});



const [form,setForm]=useState({

opd:"",
indikator:"",
namaFile:"",
keterangan:"",
status:"Menunggu"

});


const [edit,setEdit]=useState(null);



function simpan(){


if(
!form.opd ||
!form.indikator ||
!form.namaFile
){

alert("Lengkapi data terlebih dahulu");

return;

}



let hasil;


if(edit){


hasil=data.map(item=>

item.id===edit

?

{
...item,
...form
}

:

item

);


setEdit(null);


}else{


hasil=[

...data,

{

id:Date.now(),

...form

}

];


}



setData(hasil);


localStorage.setItem(
"bukti",
JSON.stringify(hasil)
);



setForm({

opd:"",
indikator:"",
namaFile:"",
keterangan:"",
status:"Menunggu"

});


}




function editData(item){


setEdit(item.id);


setForm({

opd:item.opd,

indikator:item.indikator,

namaFile:item.namaFile,

keterangan:item.keterangan,

status:item.status

});


}





function hapus(id){


const hasil=data.filter(
x=>x.id!==id
);


setData(hasil);


localStorage.setItem(
"bukti",
JSON.stringify(hasil)
);


}




return (

<div>


<h1>Bukti Dukung IKPD</h1>



<div className="card">


<h2>Tambah Bukti</h2>


<select

value={form.opd}

onChange={e=>

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

opdList.map(o=>(

<option key={o.id}>

{o.nama}

</option>

))

}


</select>




<select

value={form.indikator}

onChange={e=>

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

indikatorList.map(i=>(

<option

key={i.id}

value={i.id}

>

{i.nama}

</option>

))

}


</select>




<input

placeholder="Nama Dokumen"

value={form.namaFile}

onChange={e=>

setForm({

...form,

namaFile:e.target.value

})

}

/>




<textarea

placeholder="Keterangan"

value={form.keterangan}

onChange={e=>

setForm({

...form,

keterangan:e.target.value

})

}

/>




<select

value={form.status}

onChange={e=>

setForm({

...form,

status:e.target.value

})

}

>

<option>
Menunggu
</option>

<option>
Disetujui
</option>

<option>
Ditolak
</option>


</select>



<button onClick={simpan}>

{
edit ?
"Update"
:
"Simpan"
}

</button>



</div>





<div className="card">


<h2>
Daftar Bukti
</h2>



<table width="100%" border="1">


<thead>

<tr>

<th>No</th>
<th>OPD</th>
<th>Indikator</th>
<th>Dokumen</th>
<th>Status</th>
<th>Aksi</th>

</tr>


</thead>



<tbody>


{

data.map((item,index)=>(


<tr key={item.id}>


<td>
{index+1}
</td>


<td>
{item.opd}
</td>


<td>

{

indikatorList.find(

i=>i.id===Number(item.indikator)

)?.nama

}

</td>


<td>
{item.namaFile}
</td>


<td>
{item.status}
</td>



<td>


<button

onClick={()=>editData(item)}

>

Edit

</button>



<button

onClick={()=>hapus(item.id)}

>

Hapus

</button>



</td>


</tr>


))


}


</tbody>


</table>


</div>



</div>

)


}
