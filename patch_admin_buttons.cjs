const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

// 1. Remove inline onclick from "Bersihkan Semua" button
html = html.replace(
    /onclick="deleteAllLogs\(\)"/g,
    ''
);

// 2. Remove inline onclick from dynamic "Hapus" buttons and give them a class and data attribute
html = html.replace(
    /onclick="deleteLog\('\$\{doc\.id\}'\)"/g,
    'class="btn-hapus-log" data-id="${doc.id}"'
);

// 3. Update the script to use event listeners instead of global window functions
const jsFunctions = `
        async function deleteLog(id) {
            if (!confirm("Yakin ingin menghapus riwayat ini?")) return;
            try {
                await deleteDoc(doc(db, "visits", id));
                fetchLogs(); // Reload data
            } catch(e) {
                console.error("Gagal menghapus:", e);
                alert("Gagal menghapus data.");
            }
        }

        async function deleteAllLogs() {
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
        }

        // Attach listeners when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            const btnHapusSemua = document.getElementById('btn-hapus-semua');
            if (btnHapusSemua) {
                btnHapusSemua.addEventListener('click', deleteAllLogs);
            }

            // Event delegation for dynamically added 'Hapus' buttons
            const logBody = document.getElementById('log-body');
            if (logBody) {
                logBody.addEventListener('click', (e) => {
                    // Check if clicked element or its parent is the delete button
                    const btn = e.target.closest('.btn-hapus-log');
                    if (btn) {
                        const id = btn.getAttribute('data-id');
                        if (id) {
                            deleteLog(id);
                        }
                    }
                });
            }
        });

        async function fetchLogs() {`;

// Replace the old global window functions with the new event listener approach
// We need to carefully remove the previous window.deleteLog and window.deleteAllLogs definitions
// and replace them with the new logic.

const regex = /window\.deleteLog = async function\(id\) \{[\s\S]*?window\.deleteAllLogs = async function\(\) \{[\s\S]*?async function fetchLogs\(\) \{/m;
html = html.replace(regex, jsFunctions);

fs.writeFileSync('pages/admin.html', html);
