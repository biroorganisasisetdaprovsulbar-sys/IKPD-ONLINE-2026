import React,{
    useEffect,
    useState
} from "react";


import {
    CheckCircle,
    Save,
    ClipboardCheck
} from "lucide-react";


import "./Penilaian.css";



const API_BASE =
"http://localhost:5000";



export default function Penilaian(){



const [indikator,setIndikator]=useState([]);


const [nilai,setNilai]=useState({});


const [total,setTotal]=useState(0);


const [loading,setLoading]=useState(false);




const user =
JSON.parse(
localStorage.getItem("user")
);



const opd_id =
user?.opd_id;






useEffect(()=>{


if(opd_id){

loadData();

}


},[]);









function headers(){


return{

"Content-Type":"application/json",

Authorization:

`Bearer ${localStorage.getItem("token")}`

};


}







async function loadData(){



try{



const indikatorRes =
await fetch(

`${API_BASE}/api/indikator`

);



const indikatorData =
await indikatorRes.json();




let list=[];


if(indikatorData.success){

list=indikatorData.data;

}
else if(Array.isArray(indikatorData)){


list=indikatorData;


}



setIndikator(list);






const nilaiRes =
await fetch(

`${API_BASE}/api/penilaian/${opd_id}`,

{

headers:headers()

}

);



const nilaiData =
await nilaiRes.json();





if(nilaiData.success){



let temp={};



nilaiData.data.forEach(item=>{


temp[item.indikator_id]={


nilai_input:

item.nilai_input,


nilai_bobot:

item.nilai_bobot


};



});



setNilai(temp);


hitungTotal(temp);


}



}

catch(error){

console.log(error);

}



}









function ubahNilai(item,value){



let angka =
Number(value);



if(angka<0)

angka=0;



if(angka>100)

angka=100;






const bobot =
Number(item.bobot);




const nilaiBobot =

(
angka*bobot
)/100;






const data={


...nilai,


[item.id]:{


nilai_input:

angka,


nilai_bobot:

nilaiBobot


}


};




setNilai(data);


hitungTotal(data);



}









function hitungTotal(data){



let totalNilai=0;



Object.values(data)

.forEach(item=>{


totalNilai +=

Number(
item.nilai_bobot || 0
);



});



setTotal(

Number(
totalNilai.toFixed(2)
)

);



}








async function simpan(){



if(!opd_id){

alert(
"OPD tidak ditemukan"
);

return;

}



const payload =

indikator.map(item=>{


const itemNilai =

nilai[item.id]

||

{

nilai_input:0,

nilai_bobot:0

};



return{


opd_id,


indikator_id:item.id,


nilai_input:

itemNilai.nilai_input,


nilai_bobot:

itemNilai.nilai_bobot


};



});





try{


setLoading(true);



const response =

await fetch(

`${API_BASE}/api/penilaian`,

{

method:"POST",

headers:headers(),

body:

JSON.stringify(payload)

}

);



const result =

await response.json();



alert(
result.message
);



loadData();



}

catch(error){


console.log(error);


alert(
"Gagal menyimpan penilaian"
);


}

finally{


setLoading(false);


}



}









const jumlahTerisi =

indikator.filter(item=>

nilai[item.id]?.nilai_input

!==undefined

).length;




const progress =

indikator.length===0

?

0

:

Math.round(

jumlahTerisi /

indikator.length *

100

);









return(


<div className="penilaian-page">





<div className="page-header">


<div>


<h1>

<ClipboardCheck/>

 Penilaian IKPD

</h1>


<p>

Evaluasi indikator kinerja perangkat daerah tahun 2026

</p>


</div>



<div className="score-box">


Total Nilai


<strong>

{total}

</strong>


</div>



</div>







<div className="progress-card">


<div>


Progress Penilaian

<strong>

{progress}%

</strong>


</div>


<div className="progress-bar">


<span

style={{

width:`${progress}%`

}}

/>


</div>


</div>









<div className="table-card">



<table>


<thead>

<tr>


<th>
Status
</th>


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


</tr>

</thead>





<tbody>


{

indikator.map(item=>(



<tr key={item.id}>


<td>


{

nilai[item.id]

?

<CheckCircle

size={20}

/>

:

""

}


</td>




<td>

{item.kode_indikator}

</td>



<td>

{item.nama_indikator}

</td>



<td>

{item.bobot}%

</td>



<td>


<input


type="number"


min="0"


max="100"


value={

nilai[item.id]?.nilai_input

??

""

}



onChange={e=>

ubahNilai(

item,

e.target.value

)

}


/>



</td>




<td>


{

nilai[item.id]?.nilai_bobot

??

0

}



</td>



</tr>



))


}



</tbody>


</table>







<button

className="save-button"

onClick={simpan}

disabled={loading}

>


<Save size={18}/>


{

loading

?

"Menyimpan..."

:

"Simpan Penilaian"

}



</button>





</div>






</div>


);


}