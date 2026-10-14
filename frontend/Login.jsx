import { useState } from "react";
import axios from "axios";
import API_URL from "./src/config/api";


function Login(){

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [message,setMessage]=useState("");



const login = async()=>{


try{


const response = await axios.post(

`${API_URL}/login`,

{
username,
password
}

);



if(response.data.success){


localStorage.setItem(
"token",
response.data.token
);


localStorage.setItem(
"user",
JSON.stringify(response.data.user)
);


window.location.href="/dashboard";


}

else{


setMessage(response.data.message);


}



}
catch(error){

console.log(error);

setMessage(
"Server tidak terhubung"
);

}


};




return (

<div className="login-box">


<h2>
🔐 Login Administrator
</h2>


<input

placeholder="Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button onClick={login}>

MASUK

</button>


<p>{message}</p>


</div>

);


}


export default function Login(){

console.log("LOGIN PAGE AKTIF");