import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin IKPD");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username dan password wajib diisi");
      return;
    }

    const user = {
      username,
      role,
      login: true,
    };

    localStorage.setItem("ikpd_user", JSON.stringify(user));

    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,.15)",
        }}
      >
        <h1 style={{textAlign:"center"}}>
          IKPD ONLINE 2026
        </h1>

        <p style={{textAlign:"center"}}>
          Login Sistem Penilaian IKPD
        </p>


        <form onSubmit={handleLogin}>

          <label>Username</label>
          <input
            style={inputStyle}
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Masukkan username"
          />


          <label>Password</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Masukkan password"
          />


          <label>Role</label>

          <select
            style={inputStyle}
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >
            <option>Super Admin</option>
            <option>Admin IKPD</option>
            <option>OPD</option>
            <option>Evaluator</option>
          </select>


          <button
            style={{
              width:"100%",
              padding:"12px",
              marginTop:"20px",
              background:"#14558a",
              color:"white",
              border:"none",
              borderRadius:"8px",
              fontSize:"16px",
              cursor:"pointer"
            }}
          >
            Masuk
          </button>

        </form>

      </div>
    </div>
  );
}


const inputStyle = {
  width:"100%",
  padding:"12px",
  margin:"8px 0 15px",
  border:"1px solid #ccc",
  borderRadius:"6px",
  boxSizing:"border-box"
};
