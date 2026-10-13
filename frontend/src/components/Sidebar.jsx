import React from "react";

import {
    NavLink
} from "react-router-dom";


import {
    LayoutDashboard,
    Building2,
    ClipboardCheck,
    FileText,
    FolderOpen,
    Users,
    LogOut,
    Settings
} from "lucide-react";


import "./Sidebar.css";




export default function Sidebar(){



const menu = [


{
    title:"Dashboard",
    path:"/dashboard",
    icon:<LayoutDashboard size={20}/>
},


{
    title:"Data OPD",
    path:"/opd",
    icon:<Building2 size={20}/>
},


{
    title:"Indikator",
    path:"/indikator",
    icon:<ClipboardCheck size={20}/>
},


{
    title:"Penilaian",
    path:"/penilaian",
    icon:<ClipboardCheck size={20}/>
},


{
    title:"Bukti Dukung",
    path:"/bukti",
    icon:<FolderOpen size={20}/>
},


{
    title:"Laporan",
    path:"/laporan",
    icon:<FileText size={20}/>
},


{
    title:"Pengguna",
    path:"/pengguna",
    icon:<Users size={20}/>
},


];




return(


<aside className="sidebar">



    {/* BRAND */}

    <div className="sidebar-brand">


        <div className="logo-box">

            IKPD

        </div>


        <div>

            <h2>
                IKPD ONLINE
            </h2>


            <span>
                Tahun 2026
            </span>


        </div>


    </div>





    {/* USER */}

    <div className="sidebar-user">


        <div className="avatar">

            A

        </div>


        <div>


            <strong>
                Administrator
            </strong>


            <small>
                Admin Sistem
            </small>


        </div>


    </div>





    {/* MENU */}

    <nav className="sidebar-menu">


    {
        menu.map((item,index)=>(


            <NavLink

                key={index}

                to={item.path}


                className={({isActive})=>

                    isActive
                    ?
                    "menu-item active"
                    :
                    "menu-item"

                }


            >


                {item.icon}


                <span>
                    {item.title}
                </span>


            </NavLink>


        ))
    }



    </nav>





    {/* FOOTER */}


    <button

        className="logout-button"

    >


        <LogOut size={18}/>


        Keluar


    </button>




</aside>


);


}