<div className="content-login">


<div className="opd-card">


<h2>
📊 Daftar OPD Hasil Evaluasi
</h2>


<div className="opd-list">


{
opd.map((item,index)=>(


<div className="opd-item" key={index}>


<div>
<span>No</span>
<strong>{index+1}</strong>
</div>


<div className="nama-opd">
<span>Nama OPD</span>
<strong>{item.nama}</strong>
</div>


<div>
<span>Nilai</span>
<strong className="nilai">
{item.nilai}
</strong>
</div>


<div>
<span>Kategori</span>
<strong className="kategori">
{item.kategori}
</strong>
</div>


</div>


))
}


</div>


</div>





<div className="login-box">


<h2>
🔐 Login Administrator
</h2>


<input
placeholder="Username"
/>


<input
type="password"
placeholder="Password"
/>


<button>
MASUK
</button>


</div>


</div>
