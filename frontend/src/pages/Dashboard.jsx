import React, {
    useEffect,
    useState
} from "react";

import "./Dashboard.css";


const API_BASE =
"http://localhost:5000";



export default function Dashboard(){


const [summary,setSummary]=useState({

    total_opd:0,
    rata_nilai:0,
    tertinggi:0,
    terendah:0

});


const [ranking,setRanking]=useState([]);


const [status,setStatus]=useState([

{
    kategori:"Belum Evaluasi",
    total:0
},

{
    kategori:"Proses Evaluasi",
    total:0
},

{
    kategori:"Selesai",
    total:0
}

]);



const [loading,setLoading]=useState(true);




useEffect(()=>{

loadDashboard();

},[]);





async function loadDashboard(){


try{


const token =
localStorage.getItem("token");



const headers={

Authorization:
`Bearer ${token}`

};



// SUMMARY

const summaryRes =
await fetch(

`${API_BASE}/api/dashboard`,

{
headers
}

);



if(summaryRes.ok){


const data =
await summaryRes.json();



if(data.success){

setSummary(
data.data
);

}

}





// RANKING


const rankingRes =
await fetch(

`${API_BASE}/api/dashboard/grafik`,

{
headers
}

);



if(rankingRes.ok){


const data =
await rankingRes.json();



if(Array.isArray(data)){

setRanking(data);

}

}





// STATUS


const statusRes =
await fetch(

`${API_BASE}/api/dashboard/status`,

{
headers
}

);



if(statusRes.ok){


const data =
await statusRes.json();



if(Array.isArray(data)){

setStatus(data);

}

}



}

catch(error){

console.log(
"API belum tersedia"
);


}


finally{

setLoading(false);

}


}







return(


<div className="dashboard-page">



<div className="dashboard-header">


<div>

<h1>
Dashboard IKPD Online 2026
</h1>


<p>

<strong>
IKPD
</strong>

<br/>

<strong>
Indeks Kematangan Perangkat Daerah
</strong>

<br/>

<i>
Sistem Evaluasi Kematangan Perangkat Daerah
</i>

</p>


</div>



<div className="year-card">

Evaluasi Tahun

<strong>
2026
</strong>


</div>


</div>







<div className="stat-grid">


<Card
title="Total OPD"
value={summary.total_opd}
/>


<Card
title="Rata-rata IKPD"
value={
Number(summary.rata_nilai)
.toFixed(2)
}
/>


<Card
title="Nilai Tertinggi"
value={summary.tertinggi}
/>


<Card
title="Nilai Terendah"
value={summary.terendah}
/>


</div>







<div className="dashboard-two-column">



<div className="panel">


<h2>
🏆 Ranking IKPD OPD
</h2>


{

ranking.length===0 ?

<p>
Belum ada data ranking
</p>


:

ranking.map((item,index)=>(


<div
className="ranking-item"
key={index}
>


<span>

#{index+1}

</span>


<strong>

{item.nama_opd}

</strong>


<b>

{
Number(
item.nilai_akhir || 0
)
.toFixed(2)

}

</b>


</div>


))


}



</div>







<div className="panel">


<h2>
📊 Status Evaluasi
</h2>


{

status.map((item,index)=>(


<div
className="status-item"
key={index}
>


<strong>

{item.kategori}

</strong>


<span>

{item.total} OPD

</span>


</div>


))


}



</div>



</div>






{

loading &&

<p>
Memuat data dashboard...
</p>

}



</div>


);

}




function Card({

title,

value

}){


return(

<div className="stat-card">

<p>
{title}
</p>


<h2>
{value}
</h2>


</div>

);

}