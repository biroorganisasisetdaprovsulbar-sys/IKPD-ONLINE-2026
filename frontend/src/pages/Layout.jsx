import React, { useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";


export default function Layout() {


    const navigate = useNavigate();

    const [openProfile, setOpenProfile] = useState(false);
const [showProfileForm, setShowProfileForm] = useState(false);


    function handleLogout(){

        localStorage.removeItem("login");
        localStorage.removeItem("username");

        navigate("/");

    }



    return (

        <div className="app-layout">


            {/* ================= SIDEBAR ================= */}

            <aside className="sidebar">


                {/* BRAND */}

                <div className="brand">


                    <img
                        src="/logo-sulbar.png"
                        className="sidebar-logo"
                        alt="Logo Sulawesi Barat"
                    />


                    <div>

                        <h2>
                            IKPD
                        </h2>

                        <p>
                            ONLINE 2026
                        </p>

                    </div>


                </div>




                {/* USER */}

                <div className="user-box">


                    <div className="avatar">
                        👤
                    </div>


                    <div>

                        <strong>
                            Administrator
                        </strong>


                        <span>
                            Admin Sistem
                        </span>


                    </div>


                </div>





                {/* MENU */}

                <nav className="menu">


                    <NavLink to="/dashboard">
                        🏠 Dashboard
                    </NavLink>



                    <NavLink to="/data-opd">
                        🏢 Data OPD
                    </NavLink>



                    <NavLink to="/indikator">
                        📄 Indikator IKPD
                    </NavLink>



                    <NavLink to="/penilaian">
                        📊 Penilaian
                    </NavLink>



                    <NavLink to="/bukti">
                        📁 Bukti Dukungan
                    </NavLink>

                    <NavLink to="/verifikasi">
                        ✅ Verifikasi Bukti
                    </NavLink>

                    <NavLink to="/laporan">
                        📑 Laporan
                    </NavLink>



                    <NavLink to="/pengguna">
                        👥 Pengguna
                    </NavLink>



                    <NavLink to="/ganti-password">
                        🔐 Ganti Password
                    </NavLink>



                </nav>





                {/* LOGOUT */}


                <button
                    className="logout"
                    onClick={handleLogout}
                >

                    Keluar

                </button>



            </aside>







            {/* ================= CONTENT ================= */}


            <main className="main-content">



                {/* TOPBAR */}


                <div className="topbar">



                    <div></div>





                    <div
                        className="profile-area"
                        onClick={() =>
                            setOpenProfile(!openProfile)
                        }
                    >



                        <div className="top-avatar">
                            👤
                        </div>




                        <div className="profile-info">


                            <strong>
                                Administrator
                            </strong>


                            <span>
                                Admin Sistem
                            </span>



                        </div>




                        <span>
                            ⌄
                        </span>





                        {
                            openProfile &&

                            <div
                                className="profile-dropdown"
                                onClick={(e)=>e.stopPropagation()}
                            >


                                <div className="dropdown-title">

    👤 Administrator

    <p>
        Administrator IKPD Online 2026
    </p>

</div>


<hr />


<button
className="profile-menu-item"
onClick={()=>setShowProfileForm(true)}
>
👤 Profil Saya
</button>




                                <hr />




                                <Link to="/ganti-password">

                                    🔐 Ganti Password

                                </Link>





                                <button 
className="logout-btn"
onClick={handleLogout}
>
🚪 Logout
</button>



                            </div>

                        }



                    </div>



                </div>





                {/* PAGE CONTENT */}

                <Outlet />



            </main>

{
showProfileForm &&

<div className="profile-modal">


<div className="profile-box">


<h2>
Edit Profil Admin
</h2>


<label>
Nama Admin
</label>

<input
type="text"
defaultValue="Administrator"
/>



<label>
Username
</label>

<input
type="text"
defaultValue="admin"
/>



<label>
Email
</label>

<input
type="email"
defaultValue="admin@ikpd.go.id"
/>



<label>
No. Telepon
</label>

<input
type="text"
placeholder="Masukkan nomor telepon"
/>



<div className="profile-action">


<button
className="save-profile"
onClick={()=>setShowProfileForm(false)}
>
Simpan
</button>



<button
className="cancel-profile"
onClick={()=>setShowProfileForm(false)}
>
Batal
</button>


</div>


</div>


</div>

}


        </div>

    );


}