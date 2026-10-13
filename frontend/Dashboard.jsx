import React, {
useEffect,
useState
} from "react";

import "./Dashboard.css";


const API_BASE =
"http://localhost:5000";



export default function Dashboard(){


const [dashboard,setDashboard]=useState({

total_opd:0,

rata_nilai:0,

tertinggi:0,

terendah:0

});



const [grafik,setGrafik]=useState([]);


const [loading,setLoading]=useState(true);



const token =
localStorage.getItem("token");



const headers={

"Content-Type":"application/json",

Authorization:
`Bearer ${token}`

};




// ================================
// LOAD DATA
// ================================

useEffect(()=>{


if(!token){

console.log(
"Token tidak ditemukan"
);

return;

}



getDashboard();

getGrafik();


},[]);





// ================================
// DASHBOARD SUMMARY
// ================================


async function getDashboard(){


try{


const response =
await fetch(

`${API_BASE}/api/dashboard`,

{

method:"GET",

headers

}

);



const result =
await response.json();



console.log(
"SUMMARY:",
result
);



if(result.success){


setDashboard({

total_opd:
result.data.total_opd,


rata_nilai:
result.data.rata_nilai,


tertinggi:
result.data.tertinggi,


terendah:
result.data.terendah

});


}

else{


console.log(
result.message
);


}



}


catch(error){


console.log(
"Dashboard error",
error
);


}


}





// ================================
// GRAFIK
// ================================


async function getGrafik(){


try{


const response =
await fetch(

`${API_BASE}/api/dashboard/grafik`,

{

method:"GET",

headers

}

);



const result =
await response.json();



console.log(
"GRAFIK:",
result
);



if(Array.isArray(result)){


setGrafik(result);


}



}


catch(error){


console.log(
"Grafik error",
error
);


}


finally{


setLoading(false);


}


}







return(


<div className="dashboard-page">



<h1>
Dashboard IKPD Online 2026
</h1>




<div className="card-container">



<div className="card">

<h3>
Total OPD
</h3>


<h2>
{dashboard.total_opd}
</h2>


</div>





<div className="card">

<h3>
Rata-rata Nilai
</h3>


<h2>

{
Number(
dashboard.rata_nilai
).toFixed(2)

}

</h2>


</div>





<div className="card">

<h3>
Nilai Tertinggi
</h3>


<h2>

{
dashboard.tertinggi

}

</h2>


</div>





<div className="card">

<h3>
Nilai Terendah
</h3>


<h2>

{
dashboard.terendah

}

</h2>


</div>



</div>







<div className="panel">


<h2>
📈 Grafik Nilai OPD
</h2>



{

loading ?

<p>
Memuat data...
</p>


:

grafik.length===0?


<p>
Belum ada data evaluasi
</p>


:


grafik.map((item,index)=>(


<div

key={index}

className="grafik-item"

>


<strong>
{item.nama_opd}
</strong>


<span>

{
item.nilai_akhir
}

</span>


</div>


))


}



</div>





</div>


);


}