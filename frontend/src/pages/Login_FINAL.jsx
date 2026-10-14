import React,{useState} from "react";
import ikpdData from "../data/ikpdData";


export default function Login(){


const [username,setUsername]=useState("");
const [password,setPassword]=useState("");



function login(e){

e.preventDefault();

alert(
"Login berhasil"
);

}



return (

<div style={styles.page}>


{/* SIDEBAR */}

<div style={styles.sidebar}>


<h1>
IKPD
<br/>
ONLINE
<br/>
2026
</h1>


<p>
Sistem Informasi
<br/>
Evaluasi
<br/>
Indeks Kematangan
<br/>
Perangkat Daerah
</p>


<hr/>


<h3>
Hasil Evaluasi OPD
</h3>


<h2>
{ikpdData.length}
</h2>


<p>
OPD Terdata
</p>


</div>




{/* CONTENT */}


<div style={styles.content}>


{/* LOGIN */}


<div style={styles.login}>


<h1>
Login Sistem
</h1>



<form onSubmit={login}>


<input

placeholder="Username"

value={username}

onChange={
e=>setUsername(e.target.value)
}

style={styles.input}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

style={styles.input}

/>



<button style={styles.button}>

LOGIN

</button>


</form>


</div>




{/* DATA OPD */}


<div style={styles.card}>


<h2>
Rekap Nilai Indeks Kematangan OPD
</h2>



<div style={{
overflowX:"auto"
}}>


<table style={styles.table}>


<thead>


<tr>


<th>No</th>

<th>
OPD
</th>


{
Array.from({length:11})
.map((_,i)=>(

<th key={i}>
Nilai {i+1}
</th>

))
}



<th>
Total
</th>


<th>
Indeks
</th>


</tr>


</thead>




<tbody>


{

ikpdData.map(
(item,index)=>(


<tr key={index}>


<td>
{index+1}
</td>


<td style={{
textAlign:"left",
minWidth:"300px"
}}>

{item.opd}

</td>



{

item.variabel.map(
(v,i)=>(

<td key={i}>
{v}
</td>

)

)

}




<td>

<b>
{item.total}
</b>

</td>


<td>


<span

style={{

padding:"6px 12px",

borderRadius:"20px",

background:
item.indeks==="Tinggi"
?
"#bbf7d0"
:
"#fde68a"

}}

>


{item.indeks}


</span>


</td>



</tr>


)

)


}



</tbody>


</table>


</div>


</div>



</div>



</div>


)


}





const styles={


page:{

display:"flex",

minHeight:"100vh",

fontFamily:"Arial",

background:"#f1f5f9"

},


sidebar:{

width:"260px",

background:"#056b9f",

color:"white",

padding:"35px"

},



content:{

flex:1,

padding:"30px"

},



login:{

background:"white",

width:"450px",

margin:"auto",

padding:"30px",

borderRadius:"15px",

boxShadow:"0 5px 20px #ddd",

marginBottom:"40px"

},



input:{

width:"100%",

padding:"15px",

marginBottom:"15px",

border:"1px solid #ddd",

borderRadius:"8px"

},



button:{

width:"100%",

padding:"15px",

background:"#056b9f",

color:"white",

border:"0",

borderRadius:"8px",

fontSize:"18px"

},



card:{

background:"white",

padding:"25px",

borderRadius:"15px"

},



table:{

width:"100%",

borderCollapse:"collapse"

}


}