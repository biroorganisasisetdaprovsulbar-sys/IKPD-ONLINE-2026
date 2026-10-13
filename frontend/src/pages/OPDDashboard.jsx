import React,{
    useEffect,
    useState
} from "react";

import "./OPDDashboard.css";



const API_BASE =
"http://localhost:5000";



export default function OPDDashboard(){



    const [data,setData]=useState([]);


    const [loading,setLoading]=useState(true);





    const user =

    JSON.parse(

        localStorage.getItem("user")

    );






    useEffect(()=>{


        loadDashboard();


    },[]);








    async function loadDashboard(){



        try{


            const response =
            await fetch(

                `${API_BASE}/api/opd-dashboard/${user.opd_id}`,

                {

                    headers:{

                        Authorization:

                        `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );






            const result =
            await response.json();






            if(result.success){


                setData(
                    result.data
                );


            }

            else if(Array.isArray(result)){


                setData(result);


            }




        }

        catch(error){


            console.log(

                "Dashboard OPD error",

                error

            );


        }

        finally{


            setLoading(false);


        }



    }









    function uploadBukti(id){


        window.location.href =

        `/bukti-dukung/${id}`;


    }









    return(



<div className="opd-dashboard">





<div className="opd-header">


<h1>
Dashboard OPD
</h1>



<p>

Selamat datang,

<strong>
{" "}
{user?.nama}

</strong>

</p>



</div>









<div className="opd-card">


<h2>
📊 Evaluasi IKPD OPD
</h2>







{

loading

?

<p>
Mengambil data...
</p>



:


<table>



<thead>


<tr>


<th>
Kode
</th>


<th>
Indikator
</th>


<th>
Bobot
</th>


<th>
Nilai
</th>


<th>
Nilai Bobot
</th>


<th>
Status Bukti
</th>


<th>
Catatan
</th>


<th>
Aksi
</th>



</tr>


</thead>







<tbody>



{

data.length===0



?


<tr>

<td colSpan="8">

Belum ada indikator

</td>

</tr>





:



data.map(item=>(



<tr key={item.id}>


<td>

{item.kode_indikator}

</td>





<td>

{item.nama_indikator}

</td>





<td>

{item.bobot}%

</td>





<td>

{

item.nilai_input ??

0

}

</td>





<td>

{

item.nilai_bobot ??

0

}

</td>






<td>


<span

className={

item.status_bukti==="Diterima"

?

"status-terima"

:

item.status_bukti==="Ditolak"

?

"status-tolak"

:

"status-menunggu"

}

>


{

item.status_bukti

||

"Belum Upload"

}


</span>



</td>








<td>

{

item.catatan

||

"-"

}

</td>








<td>



<button

className="btn-upload"

onClick={()=>uploadBukti(item.id)}

>

📤 Upload

</button>



</td>






</tr>



))



}



</tbody>





</table>




}




</div>







</div>



);



}