import React, {useState} from "react";


export default function App(){

const [page,setPage]=useState("dashboard");


return(

<div style={styles.container}>


<aside style={styles.sidebar}>

<h2>IKPD</h2>
<p>ONLINE 2026</p>


<div onClick={()=>setPage("dashboard")} style={styles.menu}>
🏠 Dashboard
</div>


<div onClick={()=>setPage("opd")} style={styles.menu}>
🏢 Data OPD
</div>


<div onClick={()=>setPage("indikator")} style={styles.menu}>
📋 Indikator IKPD
</div>


<div onClick={()=>setPage("penilaian")} style={styles.menu}>
📊 Penilaian
</div>


<div style={styles.menu}>
📁 Bukti Dukung
</div>


<div style={styles.menu}>
📑 Laporan
</div>


<div style={styles.menu}>
👤 Pengguna
</div>


</aside>



<main style={styles.content}>


{page==="dashboard" && <Dashboard/>}


{page==="opd" && <DataOPD/>}


{page==="indikator" &&
<h2>Halaman Indikator IKPD</h2>
}


{page==="penilaian" &&
<h2>Halaman Penilaian IKPD</h2>
}



</main>


</div>

)

}




function Dashboard(){

return(

<>

<div style={styles.header}>

<h1>Dashboard IKPD ONLINE 2026</h1>

<p>
Sistem Informasi Penilaian Indeks Kematangan Perangkat Daerah
</p>

</div>


<div style={styles.cards}>

<Card title="Total OPD" value="42"/>
<Card title="Indikator" value="100"/>
<Card title="Progress" value="65%"/>
<Card title="Status" value="Berjalan"/>

</div>


</>

)

}




function DataOPD(){

const data=[

{
nama:"Dinas Pendidikan",
status:"Selesai",
progress:"100%"
},

{
nama:"Dinas Kesehatan",
status:"Proses",
progress:"75%"
},

{
nama:"Bappeda",
status:"Proses",
progress:"90%"
},

{
nama:"Dinas PUPR",
status:"Belum",
progress:"20%"
}

];


return(

<div style={styles.panel}>


<h1>Data OPD IKPD 2026</h1>


<input 
placeholder="Cari OPD..."
style={styles.input}
/>


<table width="100%">

<thead>

<tr>

<th>No</th>
<th>Nama OPD</th>
<th>Status</th>
<th>Progress</th>

</tr>

</thead>


<tbody>


{data.map((item,index)=>(

<tr key={index}>

<td>{index+1}</td>
<td>{item.nama}</td>
<td>{item.status}</td>
<td>{item.progress}</td>

</tr>

))}


</tbody>


</table>


</div>

)

}




function Card({title,value}){

return(

<div style={styles.card}>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

)

}



const styles={


container:{
display:"flex",
minHeight:"100vh",
background:"#f1f5f9",
fontFamily:"Arial"
},


sidebar:{
width:"240px",
background:"#0f4c81",
color:"white",
padding:"25px"
},


menu:{
padding:"15px 5px",
borderBottom:"1px solid #ffffff44",
cursor:"pointer",
fontSize:"16px"
},


content:{
flex:1,
padding:"30px"
},


header:{
background:"#0f4c81",
color:"white",
padding:"30px",
borderRadius:"10px"
},


cards:{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
marginTop:"25px"
},


card:{
background:"white",
padding:"20px",
borderRadius:"10px"
},


panel:{
background:"white",
padding:"30px",
borderRadius:"10px"
},


input:{
padding:"12px",
width:"300px",
marginBottom:"20px"
}


}
