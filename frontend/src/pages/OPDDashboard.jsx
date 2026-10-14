import React, {
    useEffect,
    useState
} from "react";


import {

    ClipboardCheck,
    Upload,
    CheckCircle,
    BarChart3

} from "lucide-react";


import "./OPDDashboard.css";




const OPDDashboard =()=>{


const [data,setData]=useState(null);




useEffect(()=>{


fetch(

"http://localhost:5000/api/opd/me"

)


.then(res=>res.json())


.then(result=>{


setData(result.data);


})


.catch(()=>{


setData(null);


});


},[]);






return(


<div className="opd-dashboard">


<div className="opd-header">


<h1>

Dashboard Perangkat Daerah

</h1>


<p>

Sistem Informasi Evaluasi Indeks Kematangan Perangkat Daerah

</p>


</div>





<div className="opd-profile">


<h2>

{

data?.nama_opd ||

"Perangkat Daerah"

}

</h2>



<span>

Status Evaluasi:

<b>

Sedang Berjalan

</b>

</span>


</div>







<div className="opd-stat">



<div className="opd-card">


<BarChart3/>


<h3>

64.70

</h3>


<p>

Nilai IKPD

</p>


</div>





<div className="opd-card">


<ClipboardCheck/>


<h3>

75%

</h3>


<p>

Progress Evaluasi

</p>


</div>






<div className="opd-card">


<CheckCircle/>


<h3>

40%

</h3>


<p>

Verifikasi

</p>


</div>


</div>









<div className="opd-menu">



<div>

<ClipboardCheck/>

<h3>

Penilaian Saya

</h3>


<p>

Isi evaluasi indikator IKPD

</p>


</div>






<div>


<Upload/>


<h3>

Bukti Dukung

</h3>


<p>

Upload dokumen pendukung

</p>


</div>







<div>


<CheckCircle/>


<h3>

Status Verifikasi

</h3>


<p>

Lihat hasil pemeriksaan

</p>


</div>



</div>







</div>



);


};


export default OPDDashboard;