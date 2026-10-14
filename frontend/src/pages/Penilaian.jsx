import React, { useEffect, useState } from "react";


export default function Penilaian(){


const [indikator,setIndikator] = useState([]);

const [nilai,setNilai] = useState({});

const [total,setTotal] = useState(0);


const opd_id = 1;



// ==========================
// LOAD DATA
// ==========================

useEffect(()=>{

    ambilData();

},[]);



async function ambilData(){


try{


// ==========================
// AMBIL INDIKATOR
// ==========================

const indikatorRes = await fetch(
"http://localhost:5000/api/indikator"
);


const indikatorJson = await indikatorRes.json();



console.log(
"HASIL INDIKATOR:",
indikatorJson
);



if(indikatorJson.success){

    setIndikator(
        indikatorJson.data
    );

}




// ==========================
// AMBIL NILAI
// ==========================


const nilaiRes = await fetch(

`http://localhost:5000/api/penilaian/${opd_id}`

);


const nilaiJson = await nilaiRes.json();



console.log(
"HASIL NILAI:",
nilaiJson
);



if(nilaiJson.success){


let temp={};


nilaiJson.data.forEach(item=>{


temp[item.indikator_id]={


nilai_input:
item.nilai_input || 0,


nilai_bobot:
item.nilai_bobot || 0,


catatan:
item.catatan || "",


bukti_dukung:
item.bukti_dukung || "",


status:
item.status || "Draft"


};


});



setNilai(temp);



hitungTotal(temp);



}



}


catch(error){

console.error(
"ERROR LOAD:",
error
);


}


}



// ==========================
// HITUNG TOTAL
// ==========================

function hitungTotal(data){


let jumlah=0;


Object.values(data)
.forEach(item=>{


jumlah += Number(
item.nilai_bobot || 0
);


});



setTotal(
jumlah.toFixed(2)
);


}




// ==========================
// INPUT NILAI
// ==========================


function ubahNilai(item,value){



let angka =
Number(value);



if(angka>100)
angka=100;



if(angka<0)
angka=0;



let bobot =

angka *
Number(item.bobot)
/100;



const update={


...nilai,


[item.id]:{


...nilai[item.id],


nilai_input:
angka,


nilai_bobot:
bobot


}


};



setNilai(update);



hitungTotal(update);



}





// ==========================
// CATATAN
// ==========================


function ubahCatatan(id,value){



const update={


...nilai,


[id]:{


...nilai[id],


catatan:value


}


};



setNilai(update);


}





// ==========================
// BUKTI DUKUNG
// ==========================


async function uploadBukti(id,file){

const formData = new FormData();

formData.append(
"file",
file
);



try{


const response = await fetch(

"http://localhost:5000/api/upload",

{

method:"POST",

body:formData

}

);



const result =
await response.json();



console.log(
"HASIL UPLOAD:",
result
);



if(result.success){


setNilai({

...nilai,


[id]:{

...nilai[id],

bukti_dukung:
result.filename

}

});


alert(
"Upload berhasil"
);


}


}
catch(error){

console.log(error);

alert(
"Upload gagal"
);

}


}





// ==========================
// SIMPAN
// ==========================

async function uploadBukti(id,file){

if(!file){
return;
}


const formData = new FormData();

formData.append(
"file",
file
);



try{


const response = await fetch(

"http://localhost:5000/api/upload",

{

method:"POST",

body:formData

}

);



const result = await response.json();



console.log(
"HASIL UPLOAD:",
result
);



if(result.success){


setNilai({

...nilai,

[id]:{

...nilai[id],

bukti_dukung:
result.filename

}

});


alert(
"Bukti berhasil diupload"
);


}


}

catch(error){

console.log(error);

alert(
"Upload gagal"
);

}


}

async function simpan(){



const payload = indikator.map(item=>{


return{


opd_id:


opd_id,



indikator_id:


item.id,



nilai_input:

nilai[item.id]?.nilai_input || 0,



nilai_bobot:

nilai[item.id]?.nilai_bobot || 0,



catatan:

nilai[item.id]?.catatan || "",



bukti_dukung:

nilai[item.id]?.bukti_dukung || "",



status:

nilai[item.id]?.status || "Draft"


};


});




console.log(
"PAYLOAD:",
payload
);




try{


const response = await fetch(

"http://localhost:5000/api/penilaian",

{

method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:

JSON.stringify(payload)


}

);



const result =
await response.json();



console.log(
"HASIL SIMPAN:",
result
);



alert(
"Penilaian berhasil disimpan"
);



}


catch(error){


console.error(
error
);


alert(
"Gagal menyimpan data"
);


}



}





// ==========================
// TAMPILAN
// ==========================


return(


<div style={{
padding:"30px"
}}>


<h1>
Penilaian IKPD
</h1>



<h2>

Total Nilai : {total}

</h2>




<table

border="1"

cellPadding="10"

width="100%"

>


<thead>

<tr>

<th>
Kode
</th>


<th>
Indikator
</th>


<th>
Bobot
</th>


<th>
Nilai
</th>


<th>
Nilai Bobot
</th>


<th>
Catatan
</th>


<th>
Bukti Dukung
</th>


</tr>

</thead>



<tbody>


{

indikator.map(item=>(


<tr key={item.id}>


<td>

{item.kode_indikator}

</td>



<td>

{item.nama_indikator}

</td>



<td>

{item.bobot}

</td>




<td>


<input


type="number"


min="0"


max="100"



value={

nilai[item.id]?.nilai_input || ""

}




onChange={(e)=>


ubahNilai(

item,

e.target.value

)


}



/>



</td>





<td>


{

Number(

nilai[item.id]?.nilai_bobot || 0

).toFixed(2)


}


</td>





<td>


<textarea


rows="3"


value={

nilai[item.id]?.catatan || ""

}



onChange={(e)=>


ubahCatatan(

item.id,

e.target.value

)


}


/>



</td>





<td>

<input

type="file"

onChange={(e)=>

uploadBukti(

item.id,

e.target.files[0]

)

}

/>


{

nilai[item.id]?.bukti_dukung &&


<div style={{marginTop:"10px"}}>


<a

href={
`http://localhost:5000/uploads/bukti/${nilai[item.id].bukti_dukung}`
}

target="_blank"

rel="noreferrer"

>

Lihat Bukti

</a>


</div>


}


</td>



</tr>


))


}



</tbody>


</table>





<button


onClick={simpan}


style={{

marginTop:"20px",

padding:"10px 20px",

fontSize:"16px"

}}


>

💾 Simpan Penilaian

</button>



</div>


);



}