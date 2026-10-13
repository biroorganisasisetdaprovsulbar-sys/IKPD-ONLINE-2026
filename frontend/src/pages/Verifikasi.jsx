import React, {
    useEffect,
    useState
} from "react";

import "./Page.css";



const API_BASE =
"http://localhost:5000";



export default function Verifikasi(){



    const [data,setData] =
    useState([]);




    const [loading,setLoading] =
    useState(false);






    useEffect(()=>{


        loadData();


    },[]);









    function header(){


        return {


            Authorization:

            `Bearer ${localStorage.getItem("token")}`


        };


    }









    // =================================
    // LOAD DATA BUKTI
    // =================================

    async function loadData(){


        try{


            const response =
            await fetch(

                `${API_BASE}/api/bukti`,

                {

                    headers:header()

                }

            );





            const hasil =
            await response.json();






            if(Array.isArray(hasil)){


                setData(hasil);


            }


            else if(hasil.success){


                setData(
                    hasil.data
                );


            }


            else{


                setData([]);


            }



        }


        catch(error){


            console.log(error);


        }



    }









    // =================================
    // PROSES VERIFIKASI
    // =================================


    async function prosesVerifikasi(

        id,

        status

    ){



        let catatan="";





        if(status==="Ditolak"){


            catatan =
            window.prompt(

                "Masukkan alasan penolakan"

            );




            if(!catatan){

                return;

            }


        }







        try{



            setLoading(true);






            const response =
            await fetch(

                `${API_BASE}/api/bukti/verifikasi/${id}`,

                {


                    method:"PUT",


                    headers:{


                        ...header(),


                        "Content-Type":

                        "application/json"


                    },



                    body:

                    JSON.stringify({


                        status,


                        catatan


                    })


                }


            );







            const hasil =
            await response.json();







            alert(

                hasil.message ||

                "Verifikasi berhasil"

            );






            loadData();






        }


        catch(error){


            console.log(error);


            alert(
                "Gagal melakukan verifikasi"
            );


        }


        finally{


            setLoading(false);


        }



    }









    return(



<div className="page-container">





<div className="page-title">


<h1>
✅ Verifikasi Bukti Dukung
</h1>



<p>
Pemeriksaan dokumen yang diinput oleh OPD
</p>



</div>








<div className="card table-card">






<table>



<thead>


<tr>


<th>
No
</th>


<th>
OPD
</th>


<th>
Indikator
</th>


<th>
Dokumen
</th>


<th>
File
</th>


<th>
Status
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


<td colSpan="7">


Belum ada bukti dukung


</td>


</tr>





:


data.map((item,index)=>(



<tr key={item.id}>


<td>

{index+1}

</td>





<td>

{item.opd}

</td>





<td>

{item.indikator}

</td>





<td>

{item.nama_dokumen}

</td>





<td>



{

item.file_path


?


<a

href={

`${API_BASE}/uploads/${item.file_path}`

}


target="_blank"

rel="noreferrer"

>


Lihat


</a>



:


"-"


}



</td>







<td>


<span

className={

item.status==="Diterima"

?

"status-terima"

:

item.status==="Ditolak"

?

"status-tolak"

:

"status-menunggu"


}

>


{item.status}


</span>



</td>









<td>



<button

className="btn-terima"


disabled={loading}


onClick={()=>


prosesVerifikasi(

item.id,

"Diterima"

)


}


>


✓ Terima


</button>








<button


className="btn-tolak"


disabled={loading}


onClick={()=>


prosesVerifikasi(

item.id,

"Ditolak"

)


}


>


✕ Tolak


</button>





</td>





</tr>



))



}



</tbody>





</table>






</div>







</div>



);



}