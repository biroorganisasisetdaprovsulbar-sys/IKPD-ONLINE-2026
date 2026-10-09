CREATE TABLE opd(
id SERIAL PRIMARY KEY,
nama_opd TEXT,
nilai_total INTEGER DEFAULT 0,
kategori TEXT,
tahun INTEGER DEFAULT 2026
);

INSERT INTO opd(nama_opd,nilai_total,kategori)
VALUES
('Biro Hukum',43,'Tinggi'),
('Dinas Pendidikan dan Kebudayaan Daerah',36,'Sedang'),
('Badan Pendapatan Daerah',35,'Sedang');
