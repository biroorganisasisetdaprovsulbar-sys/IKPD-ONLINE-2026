CREATE TABLE penilaian(
id SERIAL PRIMARY KEY,
opd_id INTEGER,
indikator_id INTEGER,
nilai INTEGER,
catatan TEXT,
status TEXT DEFAULT 'Draft'
);
