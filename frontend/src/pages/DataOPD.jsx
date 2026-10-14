import React, {
    useEffect,
    useState
} from "react";


import api from "../services/api";


import "./DataOPD.css";



export default function DataOPD(){



    const [opd,setOpd] = useState([]);

    const [loading,setLoading] = useState(true);

    const [saving,setSaving] = useState(false);

    const [search,setSearch] = useState("");



    const [editId,setEditId] = useState(null);



    const [form,setForm] = useState({

        nama_opd:"",

        kode_opd:"",

        tahun:"2026"

    });



    const [message,setMessage] = useState("");





    useEffect(()=>{


        loadOPD();


    },[]);






    async function loadOPD(){


        try{


            setLoading(true);



            const response =

            await api.get(
                "/api/opd"
            );



            if(response.data.success){


                setOpd(
                    response.data.data
                );


            }


        }

        catch(error){


            console.log(
                error
            );


            setMessage(
                "Gagal mengambil data OPD"
            );


        }


        finally{


            setLoading(false);


        }


    }









    function handleChange(e){


        setForm({

            ...form,

            [e.target.name]:

            e.target.value


        });


    }









    function resetForm(){


        setForm({

            nama_opd:"",

            kode_opd:"",

            tahun:"2026"

        });


        setEditId(null);


    }









    async function simpanOPD(){



        if(

            !form.nama_opd ||

            !form.kode_opd ||

            !form.tahun

        ){


            setMessage(
                "Semua data wajib diisi"
            );


            return;


        }







        try{


            setSaving(true);



            let response;





            if(editId){


                response =

                await api.put(

                    `/api/opd/${editId}`,

                    form

                );


            }

            else{


                response =

                await api.post(

                    "/api/opd",

                    form

                );


            }







            setMessage(

                response.data.message

            );



            resetForm();



            loadOPD();



        }


        catch(error){



            console.log(error);



            setMessage(

                error.response?.data?.message ||

                "Gagal menyimpan OPD"

            );


        }


        finally{


            setSaving(false);


        }


    }









    function editOPD(item){


        setEditId(
            item.id
        );


        setForm({

            nama_opd:
            item.nama_opd,


            kode_opd:
            item.kode_opd,


            tahun:
            item.tahun

        });


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    }









    async function hapusOPD(id){



        const yakin =

        window.confirm(

            "Yakin ingin menghapus OPD ini?"

        );



        if(!yakin)
        return;





        try{


            const response =

            await api.delete(

                `/api/opd/${id}`

            );



            setMessage(

                response.data.message

            );


            loadOPD();


        }


        catch(error){



            console.log(error);



            setMessage(

                "Gagal menghapus OPD"

            );


        }


    }









    const filteredOPD =

    opd.filter(item=>

        item.nama_opd

        .toLowerCase()

        .includes(

            search.toLowerCase()

        )

    );









    return(


        <div className="opd-page">





            <div className="page-header">


                <div>


                    <h1>
                        🏢 Data OPD
                    </h1>


                    <p>
                        Manajemen Perangkat Daerah IKPD Tahun 2026
                    </p>


                </div>



            </div>









            {
                message &&


                <div className="alert">

                    {message}

                </div>

            }









            <div className="summary-card">


                <h3>
                    Total OPD
                </h3>


                <strong>

                    {opd.length}

                </strong>


                <p>
                    Perangkat Daerah Terdaftar
                </p>


            </div>









            <div className="form-card">



                <h2>

                    {
                        editId

                        ?

                        "Edit Data OPD"

                        :

                        "Tambah OPD"

                    }

                </h2>





                <div className="form-grid">



                    <input

                    name="nama_opd"

                    placeholder="Nama OPD"

                    value={form.nama_opd}

                    onChange={handleChange}

                    />




                    <input

                    name="kode_opd"

                    placeholder="Kode OPD"

                    value={form.kode_opd}

                    onChange={handleChange}

                    />





                    <input

                    name="tahun"

                    placeholder="Tahun"

                    value={form.tahun}

                    onChange={handleChange}

                    />







                    <button

                    onClick={simpanOPD}

                    disabled={saving}

                    >


                    {

                        saving

                        ?

                        "Menyimpan..."

                        :

                        editId

                        ?

                        "Simpan Perubahan"

                        :

                        "Tambah OPD"


                    }


                    </button>



                    {

                        editId &&


                        <button

                        type="button"

                        onClick={resetForm}

                        >

                        Batal


                        </button>

                    }



                </div>


            </div>









            <div className="table-card">



                <div className="table-header">


                    <h2>
                        Daftar OPD
                    </h2>



                    <input

                    placeholder="Cari OPD..."

                    value={search}

                    onChange={

                        e=>

                        setSearch(
                            e.target.value
                        )

                    }

                    />



                </div>










                {

                loading


                ?


                <p>
                    Memuat data...
                </p>


                :



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
                                Kode
                            </th>


                            <th>
                                Tahun
                            </th>


                            <th>
                                Aksi
                            </th>



                        </tr>


                    </thead>





                    <tbody>



                    {

                    filteredOPD.map(

                    (item,index)=>(



                    <tr key={item.id}>


                        <td>
                            {index+1}
                        </td>


                        <td>
                            {item.nama_opd}
                        </td>


                        <td>
                            {item.kode_opd}
                        </td>


                        <td>
                            {item.tahun}
                        </td>


                        <td>



                            <button

                            className="edit"

                            onClick={()=>editOPD(item)}

                            >

                            Edit

                            </button>





                            <button

                            className="delete"

                            onClick={()=>hapusOPD(item.id)}

                            >

                            Hapus

                            </button>


                        </td>



                    </tr>



                    )


                    )


                    }



                    </tbody>


                </table>


                }



            </div>






        </div>


    );


}