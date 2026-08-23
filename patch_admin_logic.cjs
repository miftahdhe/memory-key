const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

// Update colspan in empty state for logs (now 8 columns)
html = html.replace(
    /tbody\.innerHTML = '<tr><td colspan="7" style="text-align: center;">Belum ada data pengunjung\.<\/td><\/tr>';/,
    `tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">Belum ada data pengunjung.</td></tr>';`
);
html = html.replace(
    /<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 30px;">Memuat riwayat login\.\.\.<\/td><\/tr>/,
    `<tr><td colspan="8" style="text-align: center; color: #94a3b8; padding: 30px;">Memuat riwayat login...</td></tr>`
);

// Add the Aksi column data
html = html.replace(
    /<td data-label="Titik Maps">\$\{coordHtml\}<\/td>/,
    `<td data-label="Titik Maps">\${coordHtml}</td>
                        <td data-label="Aksi"><button onclick="deleteLog('\${doc.id}')" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">Hapus</button></td>`
);

// Add window functions
const jsFunctions = `
        window.deleteLog = async function(id) {
            if (!confirm("Yakin ingin menghapus riwayat ini?")) return;
            try {
                await deleteDoc(doc(db, "visits", id));
                fetchLogs(); // Reload data
            } catch(e) {
                console.error("Gagal menghapus:", e);
                alert("Gagal menghapus data.");
            }
        };

        window.deleteAllLogs = async function() {
            if (!confirm("Yakin ingin MENGHAPUS SEMUA riwayat login? Data yang terhapus tidak bisa dikembalikan!")) return;
            const btn = document.getElementById("btn-hapus-semua");
            if (btn) btn.textContent = "Menghapus...";
            try {
                const q = query(collection(db, "visits"));
                const querySnapshot = await getDocs(q);
                const deletePromises = [];
                querySnapshot.forEach((d) => {
                    deletePromises.push(deleteDoc(doc(db, "visits", d.id)));
                });
                await Promise.all(deletePromises);
                fetchLogs(); // Reload data
            } catch(e) {
                console.error("Gagal menghapus semua:", e);
                alert("Gagal menghapus semua data.");
            } finally {
                if (btn) btn.textContent = "🗑️ Bersihkan Semua";
            }
        };

        async function fetchLogs() {`;

html = html.replace(/async function fetchLogs\(\) \{/, jsFunctions);

fs.writeFileSync('pages/admin.html', html);
