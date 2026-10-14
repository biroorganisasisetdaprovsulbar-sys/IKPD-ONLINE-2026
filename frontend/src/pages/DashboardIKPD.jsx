import React from "react";
import ikpdData from "../data/ikpdData";


export default function DashboardIKPD(){

    const totalOPD = ikpdData.length;


    const tinggi = ikpdData.filter(
        item => item.indeks === "Tinggi"
    ).length;


    const sedang = ikpdData.filter(
        item => item.indeks === "Sedang"
    ).length;



    return (

    <div style={{
        padding:"30px",
        background:"#f5f7fb",
        minHeight:"100vh"
    }}>


        <h1 style={{
            color:"#075985"
        }}>
            IKPD ONLINE 2026
        </h1>


        <p>
            Sistem Informasi Evaluasi Indeks Kematangan Perangkat Daerah
        </p>



        <div style={{
            display:"flex",
            gap:"20px",
            marginTop:"20px",
            marginBottom:"30px"
        }}>


            <Card
                title="Total OPD"
                value={totalOPD}
            />


            <Card
                title="Tingkat Tinggi"
                value={tinggi}
            />


            <Card
                title="Tingkat Sedang"
                value={sedang}
            />



        </div>





        <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            overflow:"auto"
        }}>


        <h2>
            Daftar Nilai OPD
        </h2>



        <table style={{
            width:"100%",
            borderCollapse:"collapse"
        }}>


        <thead>

        <tr>

            <th>No</th>
            <th>OPD</th>

            {
                Array.from({
                    length:11
                }).map((_,i)=>(

                    <th key={i}>
                        V{i+1}
                    </th>

                ))
            }


            <th>Total</th>
            <th>Indeks</th>


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
                        minWidth:"250px"
                    }}>
                        {item.opd}
                    </td>



                    {
                        item.variabel.map(
                            (nilai,i)=>(

                            <td key={i}>
                                {nilai}
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


                    <span style={{
                        background:
                        item.indeks==="Tinggi"
                        ?
                        "#bbf7d0"
                        :
                        "#fef08a",

                        padding:"5px 10px",
                        borderRadius:"15px"

                    }}>

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


    )

}



function Card({title,value}){


return (

<div style={{

background:"white",
padding:"20px",
borderRadius:"10px",
width:"180px",
boxShadow:"0 3px 10px #ddd"

}}>


<h3>
{title}
</h3>


<h1>
{value}
</h1>


</div>


)

}