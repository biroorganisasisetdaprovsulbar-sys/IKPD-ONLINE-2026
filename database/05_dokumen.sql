CREATE TABLE dokumen(
id SERIAL PRIMARY KEY,
opd_id INTEGER,
nama_file TEXT,
file_path TEXT,
status TEXT DEFAULT 'Menunggu'
);
