import React, {
    useEffect,
    useState
} from "react";


import {
    Building2,
    CheckCircle,
    Clock3,
    BarChart3,
    TrendingUp,
    TrendingDown
} from "lucide-react";


import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


import "./Dashboard.css";



const Dashboard = () => {


const [dataOPD,setDataOPD] = useState([]);

const [loading,setLoading] = useState(true);





useEffect(()=>{


fetch(
"http://localhost:5000/api/opd-public/evaluasi"
)


.then(res=>{


if(!res.ok){

throw new Error(
"API gagal dipanggil"
);

}


return res.json();


})


.then(result=>{


setDataOPD(
result.data || []
);


})


.catch(error=>{


console.error(
"Dashboard Error:",
error
);


setDataOPD([]);


})


.finally(()=>{


setLoading(false);


});



},[]);







// ===============================
// STATISTIK
// ===============================


const totalOPD =
dataOPD.length;



const nilaiArray =

dataOPD.map(

item=>

Number(
item.nilai_ikpd || 0
)

);




const rataNilai =

nilaiArray.length > 0

?

(

nilaiArray.reduce(
(a,b)=>a+b,
0
)

/

nilaiArray.length

).toFixed(2)

:

"0.00";





const nilaiTertinggi =

nilaiArray.length > 0

?

Math.max(
...nilaiArray
)

.toFixed(2)

:

"0.00";





const nilaiTerendah =

nilaiArray.length > 0

?

Math.min(
...nilaiArray
)

.toFixed(2)

:

"0.00";







// OPD yang sudah memiliki nilai

const selesai =

dataOPD.filter(

item=>

Number(item.nilai_ikpd)>0

).length;





const menunggu =

totalOPD - selesai;







// ranking tanpa merubah state

const ranking =

[...dataOPD]

.sort(

(a,b)=>

Number(b.nilai_ikpd)

-

Number(a.nilai_ikpd)

);








return (



<div className="dashboard-page">



{/* HEADER */}

<div className="dashboard-header">


<h1>
IKPD ONLINE 2026
</h1>


<p>
Sistem Informasi Evaluasi Indeks Kematangan Perangkat Daerah
</p>


<span>
Periode Evaluasi Tahun 2026
</span>


</div>







{/* CARD STATISTIK */}


<div className="stat-grid">



<div className="stat-card">

<Building2/>

<div>

<h3>

{
loading
?
"..."
:
totalOPD
}

</h3>

<p>
Total OPD
</p>


</div>

</div>








<div className="stat-card">

<CheckCircle/>

<div>

<h3>

{
selesai
}

</h3>


<p>
Selesai Evaluasi
</p>


</div>

</div>








<div className="stat-card">

<Clock3/>

<div>

<h3>

{
menunggu
}

</h3>


<p>
Menunggu Evaluasi
</p>


</div>

</div>








<div className="stat-card">

<BarChart3/>

<div>

<h3>

{
rataNilai
}

</h3>


<p>
Rata-rata IKPD
</p>


</div>

</div>




</div>








{/* NILAI */}

<div className="stat-grid">



<div className="stat-card">

<TrendingUp/>

<div>

<h3>

{nilaiTertinggi}

</h3>


<p>
Nilai Tertinggi
</p>


</div>


</div>





<div className="stat-card">

<TrendingDown/>

<div>

<h3>

{nilaiTerendah}

</h3>


<p>
Nilai Terendah
</p>


</div>


</div>




</div>









<div className="dashboard-content">







{/* GRAFIK */}

<div className="chart-box">


<h2>
Grafik Nilai IKPD OPD
</h2>




<div className="chart-area">


<ResponsiveContainer

width="100%"

height={300}

>


<BarChart

data={dataOPD}

>


<XAxis

dataKey="nama_opd"

/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="nilai_ikpd"

/>


</BarChart>



</ResponsiveContainer>


</div>


</div>









{/* RANKING */}

<div className="ranking-box">


<h2>
Ranking IKPD OPD
</h2>



{

ranking.map(

(item,index)=>(


<div

className="ranking-item"

key={item.id}

>


<div>


<strong>

#{index+1}

</strong>


<span>

{item.nama_opd}

</span>


</div>




<b>

{
Number(
item.nilai_ikpd
)

.toFixed(2)

}

</b>



</div>


)


)

}



</div>





</div>









{/* AKTIVITAS */}

<div className="activity-box">


<h2>
Aktivitas Sistem
</h2>



<div>
✓ Evaluasi IKPD Tahun 2026 sedang berjalan
</div>


<div>
✓ Data OPD berhasil diperbarui
</div>


<div>
✓ Verifikasi bukti dukung menunggu proses
</div>



</div>





</div>



);


};



export default Dashboard;