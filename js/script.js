// === FUNGSI BANTU ===
const $ = (id) => document.getElementById(id);

function tampilkanError(input, elemenError, pesan) {
    input.classList.add("salah");
    elemenError.textContent = pesan;
}

function hapusError(input, elemenError) {
    input.classList.add("salah");
    elemenError.textContent = pesan;
}

function hapusError(input, elemenError) {
    input.classList.remove("salah");
    elemenError.textContent = "";
}

function ambilSemuaPengguna() {
    const baru = JSON.parse(localStorage.getItem("penggunaBaru"))  || [];
    return dataPengguna.concat(baru);
}

function bukaModal(id) {
    $(id).classList.add("tampil");
}

function tutupSemuaModal() {
    document.querySelectorAll(".modal").forEach((m) => m.classList.remove("tampil"));
}

function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

function ambilKatalog() {
  return JSON.parse(localStorage.getItem("katalogBuku")) || dataKatalogBuku;
}

function simpanKatalog(katalog) {
  localStorage.setItem("katalogBuku", JSON.stringify(katalog));
}

function parseRupiah(teks) {
  return Number(String(teks).replace(/[^0-9]/g, "")) || 0;
}

function ambilHistory() {
  return JSON.parse(localStorage.getItem("historyTransaksi")) || [];
}

function simpanHistory(history) {
  localStorage.setItem("historyTransaksi", JSON.stringify(history));
}

function parseRupiah(teks) {
  return Number(String(teks).replace(/[^0-9]/g, "")) || 0;
}

function ambilHistory() {
  return JSON.parse(localStorage.getItem("historyTransaksi")) || [];
}

function simpanHistory(history) {
  localStorage.setItem("historyTransaksi", JSON.stringify(history));
}
// ===== HALAMAN LOGIN =====
function initLogin() {
  const formLogin = $("formLogin");
  const inputEmail = $("email");
  const inputPassword = $("password");

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    hapusError(inputEmail, $("errEmail"));
    hapusError(inputPassword, $("errPassword"));

    const email = inputEmail.value.trim().toLowerCase();
    const password = inputPassword.value;

    if (email === "") {
      tampilkanError(inputEmail, $("errEmail"), "Email wajib diisi.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      tampilkanError(inputEmail, $("errEmail"), "Format email tidak valid.");
      return;
    }
    if (password === "") {
      tampilkanError(inputPassword, $("errPassword"), "Password wajib diisi.");
      return;
    }

    const user = ambilSemuaPengguna().find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      sessionStorage.setItem("userLogin", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      alert("Email/password yang Anda masukkan salah");
    }
  });

    // --- Modal ---
  $("btnLupa").addEventListener("click", () => bukaModal("modalLupa"));
  $("btnDaftar").addEventListener("click", () => bukaModal("modalDaftar"));

  document.querySelectorAll(".tutup").forEach((tombol) => {
    tombol.addEventListener("click", tutupSemuaModal);
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) tutupSemuaModal();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") tutupSemuaModal();
  });

    // --- Lupa Password ---
  $("formLupa").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = $("emailLupa");
    const email = input.value.trim().toLowerCase();
    hapusError(input, $("errLupa"));

    if (email === "") {
      tampilkanError(input, $("errLupa"), "Email wajib diisi.");
      return;
    }
    const ada = ambilSemuaPengguna().some((u) => u.email === email);
    if (!ada) {
      tampilkanError(input, $("errLupa"), "Email tidak terdaftar.");
      return;
    }

    alert("Petunjuk reset password sudah dikirim ke " + email);
    this.reset();
    tutupSemuaModal();
  });


  // --- Daftar ---
  $("formDaftar").addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = $("namaDaftar").value.trim();
    const email = $("emailDaftar").value.trim().toLowerCase();
    const password = $("passDaftar").value;
    const err = $("errDaftar");
    err.textContent = "";

    if (nama.length < 3) {
      err.textContent = "Nama minimal 3 karakter.";
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      err.textContent = "Format email tidak valid.";
      return;
    }
    if (password.length < 6) {
      err.textContent = "Password minimal 6 karakter.";
      return;
    }
    if (ambilSemuaPengguna().some((u) => u.email === email)) {
      err.textContent = "Email sudah terdaftar.";
      return;
    }

    const baru = JSON.parse(localStorage.getItem("penggunaBaru")) || [];
    baru.push({
      id: dataPengguna.length + baru.length + 1,
      nama: nama,
      email: email,
      password: password,
      role: "User",
    });
    localStorage.setItem("penggunaBaru", JSON.stringify(baru));

    alert("Pendaftaran berhasil. Silakan login.");
    this.reset();
    tutupSemuaModal();
  });
} // <-- penutup fungsi initLogin

// ===== HALAMAN DASHBOARD =====
function sapaanWaktu(jam) {
  if (jam >= 4 && jam < 11) return "Selamat pagi";
  if (jam >= 11 && jam < 15) return "Selamat siang";
  if (jam >= 15 && jam < 18) return "Selamat sore";
  return "Selamat malam";
}

function initDashboard() {
  const user = JSON.parse(sessionStorage.getItem("userLogin"));
  if (!user) return;

  const sekarang = new Date();
  $("greeting").textContent = sapaanWaktu(sekarang.getHours()) + ", " + user.nama + "!";
  $("infoWaktu").textContent =
    sekarang.toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" }) +
    " · Peran: " + user.role;
}

// ===== HALAMAN STOK =====
function statusStok(stok) {
  if (stok === 0) return { teks: "Habis", kelas: "habis" };
  if (stok < 200) return { teks: "Menipis", kelas: "menipis" };
  return { teks: "Tersedia", kelas: "tersedia" };
}

// Membuat SATU baris <tr> lewat DOM
function buatBarisStok(buku, baru) {
  const tr = document.createElement("tr");
  if (baru) tr.classList.add("baris-baru");

  // Kolom cover
  const tdCover = document.createElement("td");
  if (buku.cover) {
    const img = document.createElement("img");
    img.src = buku.cover;
    img.alt = "Cover " + buku.namaBarang;
    img.onerror = () => { img.style.visibility = "hidden"; };
    tdCover.appendChild(img);
  } else {
    tdCover.textContent = "-";
  }
  tr.appendChild(tdCover);

  // Kolom teks biasa
  [buku.kodeBarang, buku.namaBarang, buku.jenisBarang, buku.edisi, buku.harga, buku.stok]
    .forEach((isi) => {
      const td = document.createElement("td");
      td.textContent = isi;
      tr.appendChild(td);
    });

  // Kolom status (badge)
  const status = statusStok(buku.stok);
  const tdStatus = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = "badge " + status.kelas;
  badge.textContent = status.teks;
  tdStatus.appendChild(badge);
  tr.appendChild(tdStatus);

  return tr;
}

function initStok() {
  const katalog = ambilKatalog();
  const tbody = $("isiTabelStok");

  // 1) Tampilkan semua data ke tabel
  katalog.forEach((buku) => tbody.appendChild(buatBarisStok(buku, false)));

  // 2) Form tambah stok
  const kolom = {
    kode: $("kodeBaru"),
    nama: $("namaBaru"),
    jenis: $("jenisBaru"),
    edisi: $("edisiBaru"),
    harga: $("hargaBaru"),
    stok: $("stokBaru"),
  };
  const err = $("errStok");

  $("formStok").addEventListener("submit", function (e) {
    e.preventDefault();
    Object.values(kolom).forEach((k) => hapusError(k, err));

    const kode = kolom.kode.value.trim().toUpperCase();
    const nama = kolom.nama.value.trim();
    const harga = Number(kolom.harga.value);
    const stok = Number(kolom.stok.value);

    if (kode === "") return tampilkanError(kolom.kode, err, "Kode barang wajib diisi.");
    if (!/^[A-Z]{4}[0-9]{4}$/.test(kode))
      return tampilkanError(kolom.kode, err, "Kode harus 4 huruf diikuti 4 angka, contoh: ASIP4302.");
    if (katalog.some((b) => b.kodeBarang === kode))
      return tampilkanError(kolom.kode, err, "Kode barang sudah dipakai.");
    if (nama === "") return tampilkanError(kolom.nama, err, "Nama barang wajib diisi.");
    if (kolom.jenis.value === "") return tampilkanError(kolom.jenis, err, "Pilih jenis barang.");
    if (kolom.edisi.value === "" || Number(kolom.edisi.value) < 1)
      return tampilkanError(kolom.edisi, err, "Edisi minimal 1.");
    if (kolom.harga.value === "" || harga <= 0)
      return tampilkanError(kolom.harga, err, "Harga harus lebih dari 0.");
    if (kolom.stok.value === "" || !Number.isInteger(stok) || stok < 0)
      return tampilkanError(kolom.stok, err, "Stok harus berupa angka bulat, minimal 0.");

    const bukuBaru = {
      kodeBarang: kode,
      namaBarang: nama,
      jenisBarang: kolom.jenis.value,
      edisi: kolom.edisi.value,
      stok: stok,
      harga: formatRupiah(harga),
      cover: "",
    };

    katalog.push(bukuBaru);
    simpanKatalog(katalog);

    const barisBaru = buatBarisStok(bukuBaru, true);
    tbody.appendChild(barisBaru);
    barisBaru.scrollIntoView({ behavior: "smooth", block: "center" });

    this.reset();
    alert("Stok baru berhasil ditambahkan: " + nama);
  });
}
// ===== HALAMAN CHECKOUT =====
function initCheckout() {
  const katalog = ambilKatalog();
  let keranjang = []; // isi: { kode, nama, harga, jumlah }

  const pilih = $("pilihBuku");
  const inputJumlah = $("jumlahBuku");
  const errKeranjang = $("errKeranjang");

  // Isi <select> dari katalog
  function isiPilihanBuku() {
    pilih.innerHTML = "";
    const awal = document.createElement("option");
    awal.value = "";
    awal.textContent = "-- Pilih buku --";
    pilih.appendChild(awal);

    katalog.forEach((b) => {
      const opt = document.createElement("option");
      opt.value = b.kodeBarang;
      opt.textContent = b.namaBarang + " (" + b.harga + ", stok " + b.stok + ")";
      opt.disabled = b.stok === 0;
      pilih.appendChild(opt);
    });
  }

  // Gambar ulang tabel pesanan, kembalikan total
  function tampilkanKeranjang() {
    const tbody = $("isiKeranjang");
    tbody.innerHTML = "";
    let total = 0;

    if (keranjang.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.className = "kosong";
      td.textContent = "Belum ada buku di pesanan. Pilih buku lalu klik Tambah ke pesanan.";
      tr.appendChild(td);
      tbody.appendChild(tr);
    }

    keranjang.forEach((item, indeks) => {
      const subtotal = item.harga * item.jumlah;
      total += subtotal;

      const tr = document.createElement("tr");

      const tdNama = document.createElement("td");
      tdNama.textContent = item.nama;

      const tdHarga = document.createElement("td");
      tdHarga.textContent = formatRupiah(item.harga);

      // UBAH jumlah
      const tdJumlah = document.createElement("td");
      const qty = document.createElement("input");
      qty.type = "number";
      qty.min = 1;
      qty.value = item.jumlah;
      qty.setAttribute("aria-label", "Jumlah " + item.nama);
      qty.addEventListener("change", () => {
        const stok = katalog.find((b) => b.kodeBarang === item.kode).stok;
        let baru = parseInt(qty.value, 10);
        if (!baru || baru < 1) baru = 1;
        if (baru > stok) {
          errKeranjang.textContent = "Stok " + item.nama + " hanya tersisa " + stok + ".";
          baru = stok;
        } else {
          errKeranjang.textContent = "";
        }
        item.jumlah = baru;
        tampilkanKeranjang();
      });
      tdJumlah.appendChild(qty);

      const tdSubtotal = document.createElement("td");
      tdSubtotal.textContent = formatRupiah(subtotal);

      // HAPUS item
      const tdAksi = document.createElement("td");
      const btnHapus = document.createElement("button");
      btnHapus.type = "button";
      btnHapus.className = "btn-hapus";
      btnHapus.textContent = "Hapus";
      btnHapus.addEventListener("click", () => {
        keranjang.splice(indeks, 1);
        tampilkanKeranjang();
      });
      tdAksi.appendChild(btnHapus);

      [tdNama, tdHarga, tdJumlah, tdSubtotal, tdAksi].forEach((td) => tr.appendChild(td));
      tbody.appendChild(tr);
    });

    $("totalBayar").textContent = formatRupiah(total);
    return total;
  }

  // Tampilkan riwayat transaksi
  function tampilkanHistory() {
    const tbody = $("isiHistory");
    tbody.innerHTML = "";
    const history = ambilHistory();

    if (history.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 6;
      td.className = "kosong";
      td.textContent = "Belum ada transaksi.";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    history.forEach((t) => {
      const tr = document.createElement("tr");
      [t.noDO, t.tanggal, t.nama, t.ekspedisi, t.bayar, formatRupiah(t.total)].forEach((isi) => {
        const td = document.createElement("td");
        td.textContent = isi;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  // TAMBAH item ke pesanan
  $("btnTambahItem").addEventListener("click", () => {
    errKeranjang.textContent = "";
    const buku = katalog.find((b) => b.kodeBarang === pilih.value);
    const jumlah = parseInt(inputJumlah.value, 10);

    if (!buku) {
      errKeranjang.textContent = "Pilih buku terlebih dahulu.";
      return;
    }
    if (!jumlah || jumlah < 1) {
      errKeranjang.textContent = "Jumlah minimal 1.";
      return;
    }

    const sudahAda = keranjang.find((k) => k.kode === buku.kodeBarang);
    const jumlahBaru = (sudahAda ? sudahAda.jumlah : 0) + jumlah;

    if (jumlahBaru > buku.stok) {
      errKeranjang.textContent = "Stok tidak cukup. " + buku.namaBarang + " tersisa " + buku.stok + ".";
      return;
    }

    if (sudahAda) {
      sudahAda.jumlah = jumlahBaru;
    } else {
      keranjang.push({
        kode: buku.kodeBarang,
        nama: buku.namaBarang,
        harga: parseRupiah(buku.harga),
        jumlah: jumlah,
      });
    }
    inputJumlah.value = 1;
    tampilkanKeranjang();
  });

  // Kirim form pemesanan
  const f = {
    nama: $("namaPemesan"),
    telp: $("telpPemesan"),
    alamat: $("alamatPemesan"),
    bayar: $("metodeBayar"),
  };
  const errCheckout = $("errCheckout");

  $("formCheckout").addEventListener("submit", function (e) {
    e.preventDefault();
    Object.values(f).forEach((k) => hapusError(k, errCheckout));

    if (keranjang.length === 0) {
      errCheckout.textContent = "Pesanan masih kosong. Tambahkan minimal satu buku.";
      return;
    }
    if (f.nama.value.trim().length < 3)
      return tampilkanError(f.nama, errCheckout, "Nama pemesan minimal 3 karakter.");
    if (!/^[0-9]{9,14}$/.test(f.telp.value.trim()))
      return tampilkanError(f.telp, errCheckout, "No. telepon harus 9 sampai 14 digit angka.");
    if (f.alamat.value.trim().length < 10)
      return tampilkanError(f.alamat, errCheckout, "Alamat minimal 10 karakter.");
    if (f.bayar.value === "")
      return tampilkanError(f.bayar, errCheckout, "Pilih metode pembayaran.");

    const total = tampilkanKeranjang();
    const history = ambilHistory();
    const noDO = "2026" + String(history.length + 1).padStart(4, "0");

    history.push({
      noDO: noDO,
      tanggal: new Date().toLocaleDateString("sv-SE"),
      nama: f.nama.value.trim(),
      ekspedisi: $("ekspedisi").value,
      paket: $("jenisPaket").value,
      bayar: f.bayar.value,
      total: total,
      item: keranjang.map((k) => k.nama + " x" + k.jumlah),
    });
    simpanHistory(history);

    // Kurangi stok katalog sesuai pesanan
    keranjang.forEach((k) => {
      katalog.find((b) => b.kodeBarang === k.kode).stok -= k.jumlah;
    });
    simpanKatalog(katalog);

    alert("Pesanan berhasil dibuat!\nNomor DO: " + noDO + "\nTotal: " + formatRupiah(total));

    keranjang = [];
    this.reset();
    isiPilihanBuku();
    tampilkanKeranjang();
    tampilkanHistory();
  });

  isiPilihanBuku();
  tampilkanKeranjang();
  tampilkanHistory();
}

// ===== HALAMAN TRACKING =====
const tahapPengiriman = ["Diproses", "Dikirim", "Dalam Perjalanan", "Diterima"];

// Cari data di dua sumber: data.js (dosen) dan riwayat pesanan dari halaman checkout
function ambilDataTracking(nomor) {
  if (Object.keys(dataTracking).includes(nomor)) {
    return dataTracking[nomor];
  }

  const pesanan = ambilHistory().find((h) => h.noDO === nomor);
  if (!pesanan) return null;

  // Ubah ke bentuk yang sama dengan data dosen supaya bisa ditampilkan dengan kode yang sama
  return {
    nomorDO: pesanan.noDO,
    nama: pesanan.nama,
    status: "Diproses",
    ekspedisi: pesanan.ekspedisi,
    tanggalKirim: pesanan.tanggal,
    paket: pesanan.paket,
    total: pesanan.total,
    perjalanan: [
      { waktu: pesanan.tanggal, keterangan: "Pesanan diterima dan sedang diproses oleh toko" },
    ],
  };
}

// Menentukan tahap ke berapa (1 sampai 4)
function hitungTahap(data) {
  const terakhir = data.perjalanan[data.perjalanan.length - 1];
  if (terakhir && terakhir.keterangan.toLowerCase().includes("selesai antar")) return 4;

  const indeks = tahapPengiriman.indexOf(data.status);
  return indeks === -1 ? 1 : indeks + 1;
}

function tampilkanTracking(data) {
  const tahap = hitungTahap(data);
  const persen = (tahap / tahapPengiriman.length) * 100;

  $("namaTracking").textContent = data.nama;
  $("nomorTracking").textContent = "No. DO " + data.nomorDO;
  $("teksStatus").textContent = tahapPengiriman[tahap - 1];

  // Progress bar
  $("barProgress").style.width = persen + "%";
  $("progressWrap").setAttribute("aria-valuenow", persen);

  // Stepper tahap
  const ol = $("daftarLangkah");
  ol.innerHTML = "";
  tahapPengiriman.forEach((nama, i) => {
    const li = document.createElement("li");
    li.textContent = nama;
    if (i < tahap) li.classList.add("selesai");
    ol.appendChild(li);
  });

  // Detail pengiriman
  $("dEkspedisi").textContent = data.ekspedisi;
  $("dTanggal").textContent = new Date(data.tanggalKirim + "T00:00:00")
    .toLocaleDateString("id-ID", { dateStyle: "long" });
  $("dPaket").textContent = data.paket;
  $("dTotal").textContent = formatRupiah(parseRupiah(data.total));

  // Riwayat perjalanan (terbaru di atas)
  const ul = $("daftarPerjalanan");
  ul.innerHTML = "";
  data.perjalanan.slice().reverse().forEach((p) => {
    const li = document.createElement("li");
    const waktu = document.createElement("span");
    waktu.className = "waktu";
    waktu.textContent = p.waktu;
    const ket = document.createElement("span");
    ket.textContent = p.keterangan;
    li.appendChild(waktu);
    li.appendChild(ket);
    ul.appendChild(li);
  });

  $("hasilTracking").hidden = false;
}

function initTracking() {
  const input = $("nomorDO");
  const err = $("errCari");

  $("formCari").addEventListener("submit", function (e) {
    e.preventDefault();
    hapusError(input, err);
    $("hasilTracking").hidden = true;

    const nomor = input.value.trim();

    if (nomor === "") return tampilkanError(input, err, "Nomor Delivery Order wajib diisi.");
    if (!/^[0-9]{8}$/.test(nomor))
      return tampilkanError(input, err, "Nomor DO harus 8 digit angka, contoh: 20230012.");

    const data = ambilDataTracking(nomor);
    if (!data) return tampilkanError(input, err, "Nomor DO " + nomor + " tidak ditemukan.");

    tampilkanTracking(data);
  });
}

// ===== JALANKAN SESUAI HALAMAN =====
const halaman = document.body.dataset.page;

// Selain halaman login, user harus sudah login
if (halaman !== "login" && !sessionStorage.getItem("userLogin")) {
  window.location.href = "index.html";
}

// Tombol Keluar menghapus status login
const tombolKeluar = document.getElementById("btnKeluar");
if (tombolKeluar) {
  tombolKeluar.addEventListener("click", () => sessionStorage.removeItem("userLogin"));
}

if (halaman === "login") initLogin();
if (halaman === "dashboard") initDashboard();
if (halaman === "login") initLogin();
if (halaman === "dashboard") initDashboard();
if (halaman === "stok") initStok();
if (halaman === "login") initLogin();
if (halaman === "dashboard") initDashboard();
if (halaman === "stok") initStok();
if (halaman === "checkout") initCheckout();
if (halaman === "login") initLogin();
if (halaman === "dashboard") initDashboard();
if (halaman === "stok") initStok();
if (halaman === "checkout") initCheckout();
if (halaman === "tracking") initTracking();

