# Aplikasi Web Pemesanan Buku (UTS Pemrograman Web 1)

| | |
|---|---|
| **Nama** | Naysila Rahil Maulana |
| **NIM** | 312510143 |
| **Kampus** | Universitas Pelita Bangsa |
| **Mata kuliah** | Pemrograman Web 1 |
| **Dosen** | Agung Nugroho, S.Kom., M.Kom., S.Kom., M. Kom |

## Tautan

- **Repository GitHub:** ISI_LINK_REPOSITORY
- **Video penjelasan (YouTube):** ISI_LINK_YOUTUBE

## Deskripsi Project 

Aplikasi web sederhana untuk pemesanan buku pada sebuah toko online. Project ini berfokus pada sisi **front-end**: semua data berasal dari variabel JavaScript pada file terpisah (`js/data.js`), tanpa server atau database. Aplikasi dibangun hanya dengan **HTML, CSS, dan JavaScript** tanpa framework.

## Fitur per Halaman

| Halaman | File | Fitur |
|---|---|---|
| Login | `index.html` | Validasi email dan password, alert jika salah, modal Lupa Password dan Daftar |
| Dashboard | `dashboard.html` | Greeting sesuai waktu lokal, 4 menu navigasi |
| Stok / Katalog | `stok.html` | Tabel dinamis dari `dataKatalogBuku`, tambah baris stok baru lewat DOM |
| Pemesanan | `checkout.html` | Tambah, ubah, dan hapus item pesanan, form pemesan dan pembayaran, history transaksi |
| Tracking | `tracking.html` | Cari nomor DO, progress bar status, detail ekspedisi dan riwayat perjalanan |

## Teknologi

- HTML5 (tag semantik)
- CSS3 (external, internal, dan inline; flexbox, grid, media query, animasi)
- JavaScript (manipulasi DOM, validasi form, event listener, `localStorage`, `sessionStorage`)

## Struktur Folder

```
tugas_uts_web1/
|-- index.html          (halaman login)
|-- dashboard.html
|-- stok.html
|-- checkout.html
|-- tracking.html
|-- css/
|   |-- style.css
|-- js/
|   |-- script.js
|   |-- data.js
|-- assets/
|-- img/                (cover buku)
|-- screenshots/        (tangkapan layar untuk README)
|-- README.md
```

## Cara Menjalankan

1. Download atau clone repository ini.
2. Buka folder di VS Code, klik kanan `index.html`, lalu pilih **Open with Live Server** (atau buka `index.html` langsung di browser).
3. Login memakai salah satu akun uji coba di bawah.

**Akun uji coba** (dari `data.js`)

| Email | Password |
|---|---|
| rina@gmail.com | rina123 |
| agus@gmail.com | agus123 |
| siti@gmail.com | siti123 |

**Nomor DO uji coba untuk Tracking:** `20230012` (dalam perjalanan) dan `20230013` (sudah diterima). Pesanan yang dibuat di halaman Pemesanan juga mendapat nomor DO baru yang bisa dilacak.

---

## Proses Pengerjaan

### Langkah 1: Menyiapkan struktur folder

Struktur folder dibuat sesuai instruksi soal. Pemisahan HTML (struktur), CSS (tampilan), dan JavaScript (perilaku), serta pemisahan `data.js` dari `script.js`, dilakukan agar project modular dan mudah dirawat.

![Struktur folder](screenshots/01_sturktur_folder.png)

### Langkah 2: Kerangka HTML

Kerangka dasar HTML5 dibuat dengan `lang="id"`, `charset UTF-8`, dan meta viewport. CSS dan JavaScript dihubungkan dari file terpisah. Tag `<script>` diletakkan di akhir `<body>`, dengan `data.js` dimuat sebelum `script.js`.

![Hasil kerangka HTML](screenshots/03_hasil_kerangka_html.png)

### Langkah 3: Memasang data dari dosen

File `data.js` berisi tiga variabel: `dataPengguna`, `dataKatalogBuku`, dan `dataTracking`. Gambar cover diletakkan di folder `img/`. Ada dua perbaikan kecil pada data: ekstensi cover buku PAUD dari `.jpeg` menjadi `.jpg` agar sesuai nama file, dan tanggal pada riwayat perjalanan yang kurang tanda `-`.

![Data dan gambar terpasang](screenshots/04_data_dan_gambar_terpasang.png)

Pengecekan di Console untuk memastikan `data.js` terbaca:

![Test console data](screenshots/05_test_console_data.png)

### Langkah 4: Halaman Login (`index.html`)

Halaman login berisi form email dan password, tombol Login, serta tombol Lupa Password dan Daftar yang membuka modal box. Struktur memakai tag semantik (`<main>`, `<header>`, `<form>`) dan `<label>` yang terhubung dengan `<input>` lewat `for` dan `id`.

**Sebelum diberi CSS:**

![Login tanpa CSS](screenshots/07_login_tanpa_css.png)

**Sesudah diberi CSS:**

Ketiga jenis CSS dipakai:
- **External** (`css/style.css`) untuk gaya utama yang dipakai semua halaman.
- **Internal** (tag `<style>` di `<head>`) untuk latar gradient khusus halaman login.
- **Inline** (atribut `style`) untuk perubahan kecil pada satu elemen.

![Login setelah CSS](screenshots/10_login_setelah_css.png)

**Validasi form.** Form dicek berlapis (tidak boleh kosong, format email, lalu kecocokan dengan data). Setiap kesalahan memunculkan pesan merah dan border merah pada kolom yang salah.

![Validasi error login](screenshots/12_validasi_error_login.png)

**Alert ketika email atau password salah**, sesuai instruksi soal:

![Alert login salah](screenshots/13_alert_login_salah.png)

**Modal box.** Modal adalah `<div>` yang disembunyikan dengan CSS (`display: none`) dan ditampilkan dengan menambah class `tampil` lewat JavaScript. Modal bisa ditutup dengan tombol Batal, klik area gelap, atau tombol Esc.

![Modal Lupa Password](screenshots/14_modal_lupa_password.png)

![Modal Daftar](screenshots/15_modal_daftar.png)

Akun yang dibuat lewat modal Daftar disimpan di `localStorage` sehingga langsung bisa dipakai login.

**Login dengan data yang benar:**

![Login benar](screenshots/17_login_benar.png)

### Langkah 5: Dashboard (`dashboard.html`)

Dashboard menampilkan **greeting berdasarkan waktu lokal** dari `new Date().getHours()`, nama pengguna yang login, dan empat tombol navigasi (Informasi Stok/Katalog, Tracking Pengiriman, Laporan Pemesanan, History Transaksi).

```js
function sapaanWaktu(jam) {
  if (jam >= 4 && jam < 11) return "Selamat pagi";
  if (jam >= 11 && jam < 15) return "Selamat siang";
  if (jam >= 15 && jam < 18) return "Selamat sore";
  return "Selamat malam";
}
```

![Dashboard dengan greeting](screenshots/18_dashboard_greatting.png)

Pengujian fungsi sapaan untuk beberapa jam berbeda lewat Console:

![Test sapaan di Console](screenshots/19_test_sapaan_console.png)

**Proteksi halaman.** Halaman selain login hanya bisa dibuka kalau pengguna sudah login (status disimpan di `sessionStorage`). Membuka `dashboard.html` langsung tanpa login mengembalikan pengguna ke halaman login.

![Proteksi halaman](screenshots/20_proteksi_halaman.png)

### Langkah 6: Informasi Stok / Katalog (`stok.html`)

Tabel dibuat **dinamis** dari `dataKatalogBuku`. Setiap baris dibuat dengan `document.createElement` lalu dimasukkan ke `<tbody>` dengan `appendChild`. Kolom Status berupa badge yang berubah sesuai jumlah stok (Tersedia, Menipis, Habis).

```js
const tr = document.createElement("tr");
const td = document.createElement("td");
td.textContent = buku.namaBarang;
tr.appendChild(td);
tbody.appendChild(tr);
```

![Tabel stok](screenshots/21_stok_tabel.png)

**Fitur tambah baris stok baru** lewat DOM, dengan validasi (kode barang wajib dengan format 4 huruf + 4 angka dan tidak boleh kembar, nama, jenis, edisi, harga, dan stok harus valid):

![Validasi form stok](screenshots/22_stok_validasi_form.png)

![Form stok terisi](screenshots/23_stok_form_terisi.png)

Baris baru langsung muncul di tabel dengan animasi sorotan, dan data tersimpan di `localStorage` sehingga tidak hilang saat halaman di-refresh.

![Baris stok baru](screenshots/24_stok_baris_baru.png)

### Langkah 7: Halaman Pemesanan (`checkout.html`)

Halaman ini berisi tiga bagian: data pemesanan (keranjang), data pemesan dan pembayaran, serta history transaksi. Isi keranjang disimpan dalam array, setiap perubahan (tambah, ubah, hapus) hanya mengubah array lalu tabel digambar ulang dari array tersebut.

![Tampilan awal checkout](screenshots/25_checkout_awal.png)

**Tambah item.** Pilihan buku diambil dari katalog, harga teks seperti `"Rp 180.000"` diubah menjadi angka agar total bisa dihitung.

![Tambah item pesanan](screenshots/26_checkout_tambah_item.png)

**Ubah jumlah** dan total terhitung ulang otomatis. Jumlah juga divalidasi terhadap stok:

![Ubah jumlah](screenshots/27_checkout_ubah_jumlah.png)

![Error stok tidak cukup](screenshots/28_checkout_error_stok.png)

**Validasi form pemesan** (nama, nomor telepon 9 sampai 14 digit, alamat, dan metode pembayaran):

![Validasi form checkout](screenshots/29_checkout_validasi_form.png)

**Pesanan berhasil.** Sistem membuat nomor DO otomatis dan menampilkan alert ringkasan pesanan:

![Pesanan berhasil](screenshots/30_checkout_pesanan_berhasil.png)

Pesanan masuk ke **History Transaksi**:

![History transaksi](screenshots/31_checkout_history.png)

Stok katalog ikut berkurang sesuai pesanan, sehingga halaman Stok menampilkan angka terbaru:

![Stok berkurang](screenshots/32_stok_berkurang.png)

### Langkah 8: Informasi Pengiriman (`tracking.html`)

Pengguna memasukkan Nomor Delivery Order, lalu tombol **Cari** menampilkan nama pemesan, status pengiriman (progress bar dan daftar tahap), serta ekspedisi, tanggal kirim, jenis paket, total pembayaran, dan riwayat perjalanan. Pencarian bisa menemukan nomor DO dari `data.js` maupun pesanan yang dibuat di halaman Pemesanan.

![Tampilan awal tracking](screenshots/33_tracking_awal.png)

**Validasi** nomor DO (tidak kosong, 8 digit angka):

![Validasi tracking](screenshots/34_tracking_validasi.png)

**Status dalam perjalanan** (nomor DO `20230012`):

![Tracking dalam perjalanan](screenshots/35_tracking_dalam_perjalanan.png)

**Status diterima** (nomor DO `20230013`). Status ditentukan dari catatan perjalanan terakhir, bukan hanya dari teks status di data:

![Tracking diterima](screenshots/36_tracking_diterima.png)

**Nomor DO tidak ditemukan:**

![Tracking tidak ditemukan](screenshots/37_tracking_tidak_ditemukan.png)

**Melacak pesanan baru dari halaman Pemesanan:**

![Tracking pesanan baru](screenshots/38_tracking_pesanan_baru.png)

---

## Pemenuhan Kriteria Penilaian

| Kriteria | Penerapan |
|---|---|
| Struktur HTML semantik, valid, lengkap | `<header>`, `<nav>`, `<main>`, `<section>`, `<table>` dengan `<thead>` dan `<tbody>`, `<dl>`, `<label for>`, atribut `lang` dan ARIA |
| Desain CSS | Variabel CSS, flexbox, grid, media query, animasi, CSS external, internal, dan inline |
| JavaScript DOM | Tabel dinamis, tambah baris stok, keranjang yang bisa ditambah/ubah/hapus, progress tracking, modal |
| Validasi form dan alert | Validasi berlapis di setiap form, pesan error pada kolom, `alert` untuk login salah dan konfirmasi |
| Modularitas file dan struktur | HTML, CSS, JS, dan data dipisah sesuai struktur folder soal; satu `script.js` dengan fungsi per halaman |
| Kreativitas tambahan | Greeting sesuai jam, proteksi halaman, badge status stok, stok berkurang otomatis, history transaksi, tracking untuk pesanan baru, tampilan responsif |
| Penjelasan video | Lihat video YouTube pada bagian Tautan |