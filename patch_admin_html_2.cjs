const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

// Patch Buku Harian Doi header & table
html = html.replace(
    /<div>\s*<h1 class="admin-title">📓 Buku Harian Doi \(Privat\)<\/h1>\s*<span class="admin-desc">Seluruh catatan rahasia yang disembunyikan\.<\/span>\s*<\/div>/,
    `<div>
                    <h1 class="admin-title">📓 Buku Harian Doi (Privat)</h1>
                    <span class="admin-desc">Seluruh catatan rahasia yang disembunyikan.</span>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button id="btn-hapus-semua-notes" class="back-btn" style="background: #ef4444; color: white; border-color: #ef4444;">🗑️ Bersihkan Semua</button>
                </div>`
);
html = html.replace(
    /<th style="width: 65%;">Isi Tulisan<\/th>/,
    `<th style="width: 55%;">Isi Tulisan</th>
                            <th style="width: 10%;">Aksi</th>`
);
html = html.replace(
    /<tr><td colspan="3" style="text-align: center; color: #94a3b8; padding: 30px;">Memuat data catatan\.\.\.<\/td><\/tr>/,
    `<tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 30px;">Memuat data catatan...</td></tr>`
);

// Patch Tong Sampah header & table
html = html.replace(
    /<div>\s*<h1 class="admin-title">🗑️ Tong Sampah \(Log Foto Dihapus\)<\/h1>\s*<span class="admin-desc">Foto yang seolah-olah dihapus oleh pengguna, tetap tersimpan\.<\/span>\s*<\/div>/,
    `<div>
                    <h1 class="admin-title">🗑️ Tong Sampah (Log Foto Dihapus)</h1>
                    <span class="admin-desc">Foto yang seolah-olah dihapus oleh pengguna, tetap tersimpan.</span>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button id="btn-hapus-semua-sampah" class="back-btn" style="background: #ef4444; color: white; border-color: #ef4444;">🗑️ Bersihkan Semua</button>
                </div>`
);
html = html.replace(
    /<th style="width: 50%;">Pratinjau Foto<\/th>/,
    `<th style="width: 40%;">Pratinjau Foto</th>
                            <th style="width: 10%;">Aksi</th>`
);
html = html.replace(
    /<tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 30px;">Memuat data sampah\.\.\.<\/td><\/tr>/,
    `<tr><td colspan="5" style="text-align: center; color: #94a3b8; padding: 30px;">Memuat data sampah...</td></tr>`
);

fs.writeFileSync('pages/admin.html', html);
