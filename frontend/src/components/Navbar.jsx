import React from "react";


import {
    Bell,
    CalendarDays,
    UserCircle
} from "lucide-react";


import "./Navbar.css";



export default function Navbar(){



return(


<header className="navbar">


    {/* TITLE */}

    <div className="navbar-title">


        <h1>
            IKPD ONLINE 2026
        </h1>


        <p>
            Sistem Evaluasi Kinerja Perangkat Daerah
        </p>


    </div>





    {/* RIGHT AREA */}

    <div className="navbar-right">



        <div className="evaluation-year">


            <CalendarDays size={18}/>


            <div>

                <small>
                    Tahun Evaluasi
                </small>


                <strong>
                    2026
                </strong>


            </div>


        </div>





        <button className="notification">


            <Bell size={20}/>


        </button>





        <div className="profile-box">


            <UserCircle size={38}/>


            <div>


                <strong>
                    Administrator
                </strong>


                <small>
                    Admin Sistem
                </small>


            </div>


        </div>



    </div>




</header>


);


}