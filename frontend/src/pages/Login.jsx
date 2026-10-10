import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const dataOpd = [
    { id: 1, nama: "Dinas Kesehatan", nilai: 70 },
    { id: 2, nama: "Dinas Pendidikan", nilai: 68 },
    { id: 3, nama: "Dinas Kominfo", nilai: 85 },
    { id: 4, nama: "Bappeda", nilai: 74 },
    { id: 5, nama: "Dinas PU", nilai: 91 },
  ];

  const getKategori = (nilai) => {
    if (nilai >= 85) return { text: "Sangat Baik", color: "#16a34a", bg: "#dcfce7" };
    if (nilai >= 75) return { text: "Baik", color: "#2563eb", bg: "#dbeafe" };
    if (nilai >= 65) return { text: "Perlu Perbaikan", color: "#d97706", bg: "#fef3c7" };
    return { text: "Rendah", color: "#dc2626", bg: "#fee2e2" };
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // login box
    if (form.username === "admin" && form.password === "") {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("role", "");
      navigate("/dashboard");
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #0b3c78;
        }

        .login-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 20%, rgba(120, 190, 255, 0.28), transparent 24%),
            radial-gradient(circle at 85% 25%, rgba(59, 130, 246, 0.22), transparent 22%),
            radial-gradient(circle at 75% 80%, rgba(96, 165, 250, 0.16), transparent 22%),
            linear-gradient(135deg, #0b3c78 0%, #0f5ea8 45%, #1476c9 100%);
        }

        .login-page::before {
          content: "";
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 55%);
          animation: pulseBg 10s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .login-page::after {
          content: "";
          position: absolute;
          width: 180%;
          height: 180%;
          top: -40%;
          left: -40%;
          background:
            repeating-linear-gradient(
              120deg,
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.03) 2px,
              transparent 2px,
              transparent 120px
            );
          animation: moveLines 18s linear infinite;
          pointer-events: none;
        }

        .floating-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(8px);
          opacity: 0.35;
          pointer-events: none;
        }

        .orb1 {
          width: 220px;
          height: 220px;
          top: 12%;
          left: 8%;
          background: #7dd3fc;
          animation: floatOne 9s ease-in-out infinite;
        }

        .orb2 {
          width: 300px;
          height: 300px;
          right: 4%;
          top: 16%;
          background: #60a5fa;
          animation: floatTwo 11s ease-in-out infinite;
        }

        .orb3 {
          width: 260px;
          height: 260px;
          bottom: 6%;
          left: 18%;
          background: #38bdf8;
          animation: floatThree 13s ease-in-out infinite;
        }

        .orb4 {
          width: 180px;
          height: 180px;
          bottom: 12%;
          right: 18%;
          background: #93c5fd;
          animation: floatTwo 10s ease-in-out infinite;
        }

        .page-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1350px;
          margin: 0 auto;
          padding: 34px 24px 40px;
        }

        .hero {
          text-align: center;
          color: #ffffff;
          margin-bottom: 34px;
        }

        .hero-logo {
          width: 88px;
          height: 88px;
          object-fit: contain;
          display: block;
          margin: 0 auto 16px;
          filter: drop-shadow(0 10px 18px rgba(0,0,0,0.20));
        }

        .hero h1 {
          margin: 0;
          font-size: 54px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .hero h2 {
          margin: 12px 0 8px;
          font-size: 22px;
          font-weight: 700;
          color: #e0f2fe;
        }

        .hero p {
          margin: 0;
          font-size: 18px;
          color: #dbeafe;
        }

        .content-login {
          display: grid;
          grid-template-columns: 1.7fr 0.9fr;
          gap: 32px;
          align-items: start;
        }

        .panel {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(3, 31, 77, 0.18);
        }

        .opd-panel {
          padding: 26px;
        }

        .login-panel {
          padding: 34px 30px;
          position: sticky;
          top: 24px;
        }

        .panel-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 24px;
        }

        .panel-subtitle {
          color: #64748b;
          font-size: 14px;
          margin-top: -12px;
          margin-bottom: 24px;
        }

        .opd-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .opd-item {
          display: grid;
          grid-template-columns: 70px 1.4fr 120px 180px;
          align-items: center;
          gap: 16px;
          background: linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%);
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          padding: 18px 20px;
          transition: all 0.25s ease;
        }

        .opd-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(37, 99, 235, 0.10);
          border-color: #bfdbfe;
        }

        .opd-col-label {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 5px;
        }

        .opd-no {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
        }

        .opd-name {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
        }

        .opd-score {
          font-size: 22px;
          font-weight: 800;
          color: #16a34a;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          width: fit-content;
        }

        .login-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px;
        }

        .login-help{
    font-size:15px;
    color:#64748b;
    line-height:1.8;
    margin-bottom:28px;
    font-weight:400;
}

        .demo-box {
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          color: #1e3a8a;
          border: 1px solid #bfdbfe;
          padding: 14px 16px;
          border-radius: 16px;
          font-size: 14px;
          margin-bottom: 18px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .form-input {
          width: 100%;
          height: 56px;
          padding: 0 16px;
          border-radius: 16px;
          border: 1.5px solid #dbe2ea;
          background: #ffffff;
          font-size: 16px;
          outline: none;
          transition: all 0.25s ease;
        }

        .form-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
        }

        .error-box {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          padding: 12px 14px;
          border-radius: 14px;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .login-btn {
          width: 100%;
          height: 56px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, #0f5ea8 0%, #1d4ed8 100%);
          color: white;
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 12px 24px rgba(29, 78, 216, 0.24);
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 28px rgba(29, 78, 216, 0.28);
        }

        .login-btn:active {
          transform: translateY(0);
        }

        .footer-note {
          margin-top: 16px;
          font-size: 13px;
          color: #64748b;
          text-align: center;
        }

        @keyframes pulseBg {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0.75;
          }
          100% {
            transform: scale(1.08) translate(1.5%, 1.5%);
            opacity: 1;
          }
        }

        @keyframes moveLines {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(120px, 60px, 0) rotate(0deg);
          }
        }

        @keyframes floatOne {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -25px);
          }
        }

        @keyframes floatTwo {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-28px, 20px);
          }
        }

        @keyframes floatThree {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(18px, -30px);
          }
        }

        @media (max-width: 1100px) {
          .content-login {
            grid-template-columns: 1fr;
          }

          .login-panel {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .page-content {
            padding: 24px 16px 32px;
          }

          .hero h1 {
            font-size: 38px;
          }

          .hero h2 {
            font-size: 19px;
          }

          .hero p {
            font-size: 15px;
          }

          .opd-item {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .opd-no {
            font-size: 24px;
          }

          .opd-name {
            font-size: 17px;
          }

          .opd-score {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="floating-orb orb1"></div>
        <div className="floating-orb orb2"></div>
        <div className="floating-orb orb3"></div>
        <div className="floating-orb orb4"></div>

        <div className="page-content">
          <div className="hero">
            <img
              src="/logo-sulbar.png"
              alt="Logo Sulawesi Barat"
              className="hero-logo"
            />
            <h1>IKPD ONLINE 2026</h1>
            <h2>Pemerintah Provinsi Sulawesi Barat</h2>
            <p>Sistem Informasi Indeks Kematangan Perangkat Daerah</p>
          </div>

          <div className="content-login">
            {/* KIRI - DAFTAR OPD */}
            <div className="panel opd-panel">
              <h3 className="panel-title">📊 Daftar OPD Hasil Evaluasi</h3>
              <div className="panel-subtitle">
                Menampilkan daftar OPD beserta nilai hasil evaluasi terbaru.
              </div>

              <div className="opd-list">
                {dataOpd.map((item) => {
                  const kategori = getKategori(item.nilai);
                  return (
                    <div className="opd-item" key={item.id}>
                      <div>
                        <span className="opd-col-label">No</span>
                        <div className="opd-no">{item.id}</div>
                      </div>

                      <div>
                        <span className="opd-col-label">Nama OPD</span>
                        <div className="opd-name">{item.nama}</div>
                      </div>

                      <div>
                        <span className="opd-col-label">Nilai</span>
                        <div className="opd-score">{item.nilai}</div>
                      </div>

                      <div>
                        <span className="opd-col-label">Kategori</span>
                        <span
                          className="badge"
                          style={{
                            color: kategori.color,
                            background: kategori.bg,
                          }}
                        >
                          {kategori.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KANAN - LOGIN */}
            <div className="panel login-panel">
              <h3 className="login-title">🔐 Login</h3>
              <div className="login-welcome">
    Selamat Datang di IKPD Online 2026
</div>


<div className="login-help">
    Kelola data, evaluasi kinerja, dan pantau perkembangan perangkat daerah secara terintegrasi.
</div>

              
              {error && <div className="error-box">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-input"
                    placeholder="Masukkan username"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Masukkan password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="login-btn">
                  MASUK
                </button>
              </form>

              <div className="footer-note">
                © 2026 IKPD Online — Pemerintah Provinsi Sulawesi Barat
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
