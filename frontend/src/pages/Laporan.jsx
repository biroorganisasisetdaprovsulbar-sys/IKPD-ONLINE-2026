import React,{
    useEffect,
    useState
} from "react";


import {
    Search,
    Download,
    Award,
    TrendingUp,
    Building2
} from "lucide-react";


import "./Laporan.css";



const API_BASE =
"http://localhost:5000";




export default function Laporan(){



const [data,setData]=useState([]);


const [summary,setSummary]=useState({

    total:0,

    rata:0,

    tinggi:0,

    rendah:0

});



const [search,setSearch]=useState("");



useEffect(()=>{


loadData();


},[]);








async function loadData(){



try{



const token =

localStorage.getItem("token");




const headers={

Authorization:

`Bearer ${token}`

};





const response =

await fetch(

`${API_BASE}/api/dashboard/grafik`,

{

headers

}

);



const result =

await response.json();





if(Array.isArray(result)){


setData(result);



calculateSummary(result);



}



}

catch(error){


console.log(error);


}


}








function calculateSummary(list){



if(list.length===0)

return;




const values =

list.map(item=>

Number(
item.nilai_akhir || 0
)

);





const total =

values.reduce(

(a,b)=>a+b,

0

);



setSummary({

total:list.length,

rata:

(total/list.length)

.toFixed(2),


tinggi:

Math.max(...values),


rendah:

Math.min(...values)

});



}









function kategori(nilai){



if(nilai>=90)

return

"Sangat Baik";



if(nilai>=75)

return

"Baik";



return

"Perlu Perbaikan";


}







const filtered =

data.filter(item=>

item.nama_opd

.toLowerCase()

.includes(

search.toLowerCase()

)

);









return(



<div className="laporan-page">





<div className="page-header">


<div>


<h1>

📄 Laporan IKPD 2026

</h1>


<p>

Rekapitulasi hasil evaluasi perangkat daerah

</p>


</div>




<button className="download">

<Download size={18}/>

Export

</button>



</div>









<div className="summary-grid">



<Card

icon={<Building2/>}

title="Total OPD"

value={summary.total}

/>



<Card

icon={<TrendingUp/>}

title="Rata-rata Nilai"

value={summary.rata}

/>



<Card

icon={<Award/>}

title="Nilai Tertinggi"

value={summary.tinggi}

/>



<Card

icon={<Award/>}

title="Nilai Terendah"

value={summary.rendah}

/>



</div>









<div className="table-card">



<div className="search">


<Search size={18}/>


<input

placeholder="Cari OPD..."

value={search}

onChange={e=>

setSearch(e.target.value)

}


/>


</div>







<table>


<thead>


<tr>

<th>

Ranking

</th>


<th>

Nama OPD

</th>


<th>

Nilai

</th>


<th>

Kategori

</th>


</tr>


</thead>




<tbody>



{

filtered.map((item,index)=>(



<tr key={index}>


<td>


#{index+1}


</td>



<td>


{item.nama_opd}


</td>



<td>


{

Number(

item.nilai_akhir

)

.toFixed(2)

}



</td>




<td>


<span

className="badge"

>


{

kategori(

Number(

item.nilai_akhir

)

)

}



</span>


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







function Card({

icon,

title,

value

}){


return(

<div className="stat-card">


<div>

{icon}

</div>


<section>

<p>

{title}

</p>


<h2>

{value}

</h2>


</section>



</div>


);


}