import React, { useState } from "react";
import ikpdData from "../data/ikpdData";
import "./Login.css";


function Login() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");



  function handleLogin(e){

    e.preventDefault();

    alert("Login berhasil");

  }





  // ==========================
  // REKAP DATA
  // ==========================


  const totalOPD = ikpdData.length;


  const jumlahTinggi = ikpdData.filter(
    item => item.indeks === "Tinggi"
  ).length;



  const jumlahSedang = ikpdData.filter(
    item => item.indeks === "Sedang"
  ).length;



  const jumlahRendah = ikpdData.filter(
    item => item.indeks === "Rendah"
  ).length;





  // ==========================
  // SEARCH OPD
  // ==========================


  const filteredOPD = ikpdData.filter(item =>

    item.opd
    .toLowerCase()
    .includes(
      search.toLowerCase()
    )

  );





  return (

<div className="login-page">


<div className="login-container">





{/* ======================
    PANEL DATA OPD
======================= */}



<div className="login-information">


<h3>
Rekap Evaluasi OPD
</h3>





{/* REKAP */}



<div className="rekap-box">


<div className="rekap-item total">

<span>
Total OPD
</span>

<b>
{totalOPD}
</b>

</div>





<div className="rekap-item tinggi">

<span>
Tinggi
</span>

<b>
{jumlahTinggi}
</b>

</div>





<div className="rekap-item sedang">

<span>
Sedang
</span>

<b>
{jumlahSedang}
</b>

</div>





<div className="rekap-item rendah">

<span>
Rendah
</span>

<b>
{jumlahRendah}
</b>

</div>



</div>








{/* SEARCH */}



<div className="search-box">


<input

type="text"

placeholder="Cari nama OPD..."

value={search}

onChange={
(e)=>setSearch(e.target.value)
}

/>


</div>









{/* LIST OPD */}



<div className="opd-list">



{


filteredOPD.map((item,index)=>(



<div

className="opd-card"

key={index}

>




<h4>


<span className="nomor-opd">

{String(index+1).padStart(2,"0")}.

</span>


{item.opd}



</h4>







<div className="nilai-box">



{


item.variabel.map((nilai,i)=>(


<span key={i}>

V{i+1}:{nilai}

</span>


))


}



</div>







<div className="total-box">


<span>

Total :

<b>

{item.total}

</b>


</span>





<label>

{item.indeks}

</label>



</div>




</div>



))


}





</div>




</div>









{/* ======================
    PANEL LOGIN
======================= */}



<div className="login-panel">





<div className="header-login">



<h1 className="brand-title">


<span className="brand-line line-1">

IKPD

</span>


<span className="brand-line line-2">

ONLINE

</span>


<span className="brand-line line-3">

2026

</span>


</h1>






<p className="brand-subtitle">


Sistem Informasi Evaluasi Indeks Kematangan

<br/>

Perangkat Daerah


</p>





</div>







<div className="login-box">


<h2>

Login Sistem

</h2>





<form onSubmit={handleLogin}>



<input

type="text"

placeholder="Username"

value={username}

onChange={
(e)=>setUsername(e.target.value)
}

/>






<input

type="password"

placeholder="Password"

value={password}

onChange={
(e)=>setPassword(e.target.value)
}

/>





<button>

LOGIN

</button>



</form>





</div>






</div>





</div>


</div>


  );


}



export default Login;