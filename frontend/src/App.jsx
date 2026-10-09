import React from "react";

export default function App() {
  return (
    <div style={styles.container}>

      <aside style={styles.sidebar}>
        <h2>IKPD</h2>
        <p style={styles.logo}>ONLINE 2026</p>

        <nav>
          <div style={styles.menu}>🏠 Dashboard</div>
          <div style={styles.menu}>🏢 Data OPD</div>
          <div style={styles.menu}>📋 Indikator IKPD</div>
          <div style={styles.menu}>📊 Penilaian</div>
          <div style={styles.menu}>📁 Bukti Dukung</div>
          <div style={styles.menu}>📑 Laporan</div>
          <div style={styles.menu}>👤 Pengguna</div>
        </nav>
      </aside>


      <main style={styles.content}>

        <header style={styles.header}>
          <h1>Dashboard IKPD ONLINE 2026</h1>
          <p>
            Sistem Informasi Penilaian Indeks Kematangan Perangkat Daerah
          </p>
        </header>


        <section style={styles.cards}>

          <Card title="Total OPD" value="42" />
          <Card title="Indikator" value="100" />
          <Card title="Progress" value="65%" />
          <Card title="Status" value="Berjalan" />

        </section>


        <section style={styles.panel}>

          <h2>Monitoring Penilaian IKPD</h2>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>OPD</th>
                <th>Status</th>
                <th>Nilai</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>1</td>
                <td>Dinas Pendidikan</td>
                <td>Selesai</td>
                <td>86</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Dinas Kesehatan</td>
                <td>Proses</td>
                <td>72</td>
              </tr>

              <tr>
                <td>3</td>
                <td>Bappeda</td>
                <td>Belum</td>
                <td>-</td>
              </tr>

            </tbody>

          </table>

        </section>

      </main>

    </div>
  );
}


function Card({title,value}){

return (

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


logo:{
fontSize:"14px",
marginBottom:"30px"
},


menu:{
padding:"14px 5px",
cursor:"pointer",
borderBottom:"1px solid rgba(255,255,255,.2)"
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
borderRadius:"10px",
boxShadow:"0 3px 10px #ddd"
},


panel:{
marginTop:"30px",
background:"white",
padding:"25px",
borderRadius:"10px"
}

}
       
