const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

// Add "Hapus Semua" button
html = html.replace(
    /<a href="\.\.\/index\.html" class="back-btn">Kembali<\/a>/,
    `<div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button id="btn-hapus-semua" class="back-btn" style="background: #ef4444; color: white; border-color: #ef4444;">🗑️ Bersihkan Semua</button>
                    <a href="../index.html" class="back-btn">Kembali</a>
                </div>`
);

// Add Aksi header
html = html.replace(
    /<th style="width: 15%">Titik Maps<\/th>/,
    `<th style="width: 15%">Titik Maps</th>
                            <th style="width: 10%">Aksi</th>`
);

fs.writeFileSync('pages/admin.html', html);
