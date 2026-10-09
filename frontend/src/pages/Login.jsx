import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Login(){

const navigate = useNavigate();


const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("Super Admin");


function handleLogin(e){

e.preventDefault();


if(username==="admin" && password==="123456"){

localStorage.setItem(
"ikpd_user",
JSON.stringify({
username,
role
})
);


navigate("/");

}
else{

alert("Username atau password salah");

}

}



return(

<div style={styles.page}>


<div style={styles.box}>


<h1>
IKPD ONLINE 2026
</h1>


<p>
Login Sistem Informasi IKPD
</p>



<form onSubmit={handleLogin}>


<input
style={styles.input}
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>



<input
style={styles.input}
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>



<select
style={styles.input}
value={role}
onChange={(e)=>setRole(e.target.value)}
>

<option>
Super Admin
</option>

<option>
Admin IKPD
</option>

<option>
OPD
</option>

<option>
Evaluator
</option>


</select>



<button style={styles.button}>
Masuk
</button>



</form>


<p>
Login demo:
<br/>
Username: admin
<br/>
Password: 123456
</p>


</div>


</div>

)

}



const styles={


page:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#f1f5f9"
},


box:{
background:"white",
padding:"40px",
borderRadius:"12px",
width:"400px",
textAlign:"center"
},


input:{
width:"100%",
padding:"12px",
margin:"10px 0",
boxSizing:"border-box"
},


button:{
width:"100%",
padding:"12px",
background:"#14558a",
color:"white",
border:"none",
borderRadius:"8px"
}


}
