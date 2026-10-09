CREATE TABLE indikator(
id SERIAL PRIMARY KEY,
kode TEXT,
nama_indikator TEXT
);

INSERT INTO indikator(kode,nama_indikator) VALUES
('I','Perencanaan'),
('II','Monitoring dan Pengendalian'),
('III','Penjaminan Mutu Layanan'),
('IV','Standar Operasional Prosedur'),
('V','Pendidikan dan Pelatihan'),
('VI','Analisis Kebijakan dan Pemecahan Masalah'),
('VII','Manajemen Sumber Daya'),
('VIII','Manajemen Risiko'),
('IX','Pengukuran Kinerja'),
('X','Pengembangan Inovasi Layanan'),
('XI','Budaya Organisasi');
