import React, {
    useEffect,
    useState
} from "react";


import {
    FileDown,
    FileSpreadsheet
} from "lucide-react";


import "./Laporan.css";



const Laporan = () => {


const [data,setData] = useState([]);




useEffect(()=>{


fetch(

"http://localhost:5000/api/opd-public/evaluasi"

)


.then(res=>res.json())


.then(result=>{


setData(
result.data || []
);


})


.catch(()=>{


setData([]);


});


},[]);







const exportPDF=()=>{


window.print();


};




const exportExcel=()=>{


let csv =

"Nama OPD,Nilai IKPD,Status\n";


data.forEach(item=>{


csv +=

`${item.nama_opd},${item.nilai_ikpd},${item.status}\n`;


});



const blob =

new Blob(

[csv],

{

type:

"text/csv"

}

);



const url=

URL.createObjectURL(blob);



const link=

document.createElement("a");


link.href=url;


link.download=

"Laporan_IKPD_2026.csv";


link.click();



};






return (

<div className="laporan-page">



<div className="laporan-header">


<h1>

Laporan IKPD 2026

</h1>


<p>

Rekap hasil evaluasi Indeks Kematangan Perangkat Daerah

</p>


</div>






<div className="laporan-action">


<button

onClick={exportPDF}

>


<FileDown/>

Export PDF


</button>



<button

onClick={exportExcel}

>


<FileSpreadsheet/>

Export Excel


</button>



</div>








<div className="laporan-card">


<table>


<thead>

<tr>

<th>

No

</th>


<th>

Nama OPD

</th>


<th>

Nilai IKPD

</th>


<th>

Status

</th>


</tr>


</thead>



<tbody>


{

data.map(

(item,index)=>(


<tr key={index}>


<td>

{index+1}

</td>


<td>

{item.nama_opd}

</td>


<td>

<strong>

{item.nilai_ikpd}

</strong>

</td>


<td>

<span>

{item.status}

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

);

};


export default Laporan;