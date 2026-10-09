import React from "react";

function App() {
  return (
    <div style={{
      fontFamily:"Arial",
      minHeight:"100vh",
      background:"#f5f7fb"
    }}>

      <header style={{
        background:"#0f4c81",
        color:"white",
        padding:"25px"
      }}>
        <h1>IKPD ONLINE 2026</h1>
        <p>
          Sistem Informasi Penilaian Indeks Kematangan Perangkat Daerah
        </p>
      </header>


      <main style={{
        padding:"30px"
      }}>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",
          gap:"20px"
        }}>

          <Card 
          title="Total OPD"
          value="42"
          />

          <Card
          title="Indikator"
          value="100"
          />

          <Card
          title="Progress"
          value="65%"
          />

          <Card
          title="Status"
          value="Berjalan"
          />

        </div>


        <div style={{
          marginTop:"30px",
          background:"white",
          padding:"25px",
          borderRadius:"10px"
        }}>

          <h2>Dashboard Penilaian IKPD</h2>

          <p>
          Selamat datang pada sistem monitoring 
          Indeks Kematangan Perangkat Daerah Tahun 2026.
          </p>

        </div>


      </main>

    </div>
  );
}


function Card({title,value}){

return (

<div style={{
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 2px 8px #ddd"
}}>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

)

}


export default App;
