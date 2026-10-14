import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  FileCheck,
  FolderCheck,
  BadgeCheck,
  FileBarChart,
  Users,
  LogOut
} from "lucide-react";

import "./Sidebar.css";


const Sidebar = () => {


  const navigate = useNavigate();


  const menu = [

    {
      name:"Dashboard",
      path:"/dashboard",
      icon:<LayoutDashboard size={20}/>
    },

    {
      name:"Data OPD",
      path:"/opd",
      icon:<Building2 size={20}/>
    },


    {
      name:"Indikator IKPD",
      path:"/indikator",
      icon:<ClipboardList size={20}/>
    },


    {
      name:"Penilaian",
      path:"/penilaian",
      icon:<FileCheck size={20}/>
    },


    {
      name:"Bukti Dukung",
      path:"/bukti-dukung",
      icon:<FolderCheck size={20}/>
    },


    {
      name:"Verifikasi",
      path:"/verifikasi",
      icon:<BadgeCheck size={20}/>
    },


    {
      name:"Laporan",
      path:"/laporan",
      icon:<FileBarChart size={20}/>
    },


    {
      name:"Pengguna",
      path:"/pengguna",
      icon:<Users size={20}/>
    }

  ];



  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };




  return (

    <aside className="sidebar">


      {/* LOGO */}

      <div className="sidebar-logo">


        <div className="logo-text">

          <span className="logo-main">
            IKPD
          </span>


          <span className="logo-sub">
            ONLINE
          </span>


        </div>


        <div className="year">

          2026

        </div>


      </div>





      {/* USER */}

      <div className="sidebar-user">


        <div className="avatar">

          A

        </div>


        <div>

          <h4>
            Administrator
          </h4>

          <span>
            admin
          </span>

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

                isActive ?

                "menu-item active"

                :

                "menu-item"

              }

            >


              {item.icon}


              <span>
                {item.name}
              </span>



            </NavLink>


          ))
        }


      </nav>







      {/* FOOTER */}

      <button

        className="logout-btn"

        onClick={logout}

      >

        <LogOut size={20}/>

        <span>
          Keluar
        </span>


      </button>



    </aside>

  );

};


export default Sidebar;