import React,{
useState
}
from "react";


import {
useNavigate
}
from "react-router-dom";


import {
LogIn
}
from "lucide-react";


import api from "../services/api";


import "./Login.css";





export default function Login(){



const navigate =
useNavigate();



const [form,setForm]=useState({

username:"",

password:""

});



const [loading,setLoading]=useState(false);


const [error,setError]=useState("");





function change(e){


setForm({

...form,

[e.target.name]:

e.target.value


});


}







async function submit(e){


e.preventDefault();



try{


setLoading(true);


setError("");





const response =

await api.post(

"/api/login",

form

);





const result =
response.data;





if(result.success){



localStorage.setItem(

"token",

result.token

);



localStorage.setItem(

"user",

JSON.stringify(

result.user

)

);






// REDIRECT ROLE



if(

result.user.role==="OPD"

){


navigate("/penilaian");


}


else if(

result.user.role==="Evaluator"

){


navigate("/laporan");


}


else{


navigate("/dashboard");


}



}

else{


setError(

result.message

);


}



}

catch(error){


setError(

"Username atau password salah"

);


}

finally{


setLoading(false);


}



}








return(



<div className="login-page">



<div className="login-card">



<div className="login-logo">

IKPD

</div>




<h1>

IKPD ONLINE 2026

</h1>



<p>

Sistem Evaluasi Kinerja Perangkat Daerah

</p>





<form onSubmit={submit}>


<input

name="username"

placeholder="Username"

value={form.username}

onChange={change}

/>




<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={change}

/>





{

error &&

<div className="error">

{error}

</div>

}





<button

disabled={loading}

>


<LogIn size={18}/>


{

loading

?

"Masuk..."

:

"Login"

}



</button>




</form>


</div>



</div>


);


}