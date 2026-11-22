Note From Romy:
Yg udah gw kelarin & debug:
1. Kemarin web sempet ngeloop / ngefreeze pas mau pindah ke result, sekarang udah aman
2. Opsi D di kuis kemarin gak bisa diklik gara-gara kurang titik di kodenya, udah gw benerin
3. Kunci jawaban sama bobot nilai 100 poin dari Habibi udah gw pasang semua di script.js. Rumus IQ 85-138 sama 5 kategorinya juga udah jalan bener di result.html
4. Bug durasi kuis yg sempet tembus puluhan menit gara-gara waktu nyangkut di browser udah gw fix, sekarang tiap mulai tes baru bakal ke-reset ke 0 lagi
5. Halaman result udah gw kerjain: ada lingkaran meteran IQ, detail bar per kategori (logika, pola, numerik), tombol ulangi tes, sama tombol copy hasil
6. Favicon SVG yg di Canva udah gw pasang ke semua halaman (userdb, quiz, result)
7. Biodata kita bertiga di userdb udah gw rapihin styling-nya
Catatan buat Habibi:
- Soal shortcut keyboard (1 2 3 4 / enter) yg mau lu tambahin, nanti lu tinggal taro di script.js bagian paling bawah kuis aja ya abis lu pull

Catatan buat Aisha:
- Sha, ini nemu PR UX di soal matriks gambar (soal 3, 6, 7, sama 8). Di laptop gambarnya kegedean di atas terus pilihannya di bawah, jadinya user harus scroll buat milih jawaban. Tes IQ gambar tuh gak enak bgt kalo di-scroll soalnya fokus liat polanya jadi kacau. Tolong di CSS lu atur buat tampilan laptop (min-width 769px), bikin jadi 2 kolom: kiri gambar soalnya, kanan pilihan jawabannya + tombol next. Biar pas 1 layar gak usah scroll. Kalo di HP baru biarin atas-bawah kyk biasa

- Sama sekalian rapihin layout hero section di beranda ya Sha, spacing sama responsivenya dicek lagi di beberapa ukuran layar biar gak ada elemen yang numpuk atau kepotong pas dibuka di hp/tablet