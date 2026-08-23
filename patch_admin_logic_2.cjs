const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

// 1. Add logic for Notes and Deleted Photos

const jsLogic = `
        async function deleteNote(id) {
            if (!confirm("Yakin ingin menghapus catatan ini secara permanen?")) return;
            try {
                await deleteDoc(doc(db, "secret_notes", id));
                fetchNotes(); // Reload data
            } catch(e) {
                console.error("Gagal menghapus catatan:", e);
                alert("Gagal menghapus catatan.");
            }
        }

        async function deleteAllNotes() {
            if (!confirm("Yakin ingin MENGHAPUS SEMUA catatan privat? Data tidak bisa dikembalikan!")) return;
            const btn = document.getElementById("btn-hapus-semua-notes");
            if (btn) btn.textContent = "Menghapus...";
            try {
                const q = query(collection(db, "secret_notes"));
                const querySnapshot = await getDocs(q);
                const deletePromises = [];
                querySnapshot.forEach((d) => {
                    deletePromises.push(deleteDoc(doc(db, "secret_notes", d.id)));
                });
                await Promise.all(deletePromises);
                fetchNotes(); // Reload data
            } catch(e) {
                console.error("Gagal menghapus semua catatan:", e);
                alert("Gagal menghapus semua catatan.");
            } finally {
                if (btn) btn.textContent = "🗑️ Bersihkan Semua";
            }
        }

        async function deleteDeletedPhoto(id) {
            if (!confirm("Yakin ingin menghapus foto ini dari tong sampah secara permanen?")) return;
            try {
                await deleteDoc(doc(db, "photos", id));
                fetchPhotos(); // Reload data
            } catch(e) {
                console.error("Gagal menghapus foto:", e);
                alert("Gagal menghapus foto.");
            }
        }

        async function deleteAllDeletedPhotos() {
            if (!confirm("Yakin ingin MENGOSONGKAN TONG SAMPAH? Semua foto di dalamnya akan terhapus permanen!")) return;
            const btn = document.getElementById("btn-hapus-semua-sampah");
            if (btn) btn.textContent = "Menghapus...";
            try {
                // Fetch only photos where deleted == true
                // But wait, our rule or index might require specific query, let's just fetch all and filter in JS to avoid index issues
                const q = query(collection(db, "photos"));
                const querySnapshot = await getDocs(q);
                const deletePromises = [];
                querySnapshot.forEach((d) => {
                    if (d.data().deleted === true) {
                        deletePromises.push(deleteDoc(doc(db, "photos", d.id)));
                    }
                });
                await Promise.all(deletePromises);
                fetchPhotos(); // Reload data
            } catch(e) {
                console.error("Gagal mengosongkan tong sampah:", e);
                alert("Gagal mengosongkan tong sampah.");
            } finally {
                if (btn) btn.textContent = "🗑️ Bersihkan Semua";
            }
        }
`;

// Inject before async function deleteAllLogs()
html = html.replace(/async function deleteAllLogs\(\) \{/, jsLogic + "\n        async function deleteAllLogs() {");

// 2. Attach listeners in DOMContentLoaded
const newListeners = `
            const btnHapusSemuaNotes = document.getElementById('btn-hapus-semua-notes');
            if (btnHapusSemuaNotes) {
                btnHapusSemuaNotes.addEventListener('click', deleteAllNotes);
            }
            const btnHapusSemuaSampah = document.getElementById('btn-hapus-semua-sampah');
            if (btnHapusSemuaSampah) {
                btnHapusSemuaSampah.addEventListener('click', deleteAllDeletedPhotos);
            }

            const notesBody = document.getElementById('notes-body');
            if (notesBody) {
                notesBody.addEventListener('click', (e) => {
                    const btn = e.target.closest('.btn-hapus-note');
                    if (btn) {
                        const id = btn.getAttribute('data-id');
                        if (id) deleteNote(id);
                    }
                });
            }

            const deletedPhotosBody = document.getElementById('deleted-photos-body');
            if (deletedPhotosBody) {
                deletedPhotosBody.addEventListener('click', (e) => {
                    const btn = e.target.closest('.btn-hapus-sampah');
                    if (btn) {
                        const id = btn.getAttribute('data-id');
                        if (id) deleteDeletedPhoto(id);
                    }
                });
            }
`;

html = html.replace(/\/\/ Event delegation for dynamically added 'Hapus' buttons/, newListeners + "\n            // Event delegation for dynamically added 'Hapus' buttons");

// 3. Update fetchNotes HTML template
html = html.replace(
    /<tbody>\s*<tr><td colspan="3" style="text-align: center; color: #94a3b8; padding: 30px;">Memuat data catatan\.\.\.<\/td><\/tr>\s*<\/tbody>/,
    `<tbody>
                        <tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 30px;">Memuat data catatan...</td></tr>
                    </tbody>`
);
html = html.replace(
    /tbody\.innerHTML = '<tr><td colspan="3" style="text-align: center;">Belum ada coretan catatan pribadi\.<\/td><\/tr>';/,
    `tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Belum ada coretan catatan pribadi.</td></tr>';`
);
html = html.replace(
    /tbody\.innerHTML = \`<tr><td colspan="3" style="text-align: center; color: red;">Gagal memuat catatan: \$\{e\.message\}<\/td><\/tr>\`;/,
    `tbody.innerHTML = \`<tr><td colspan="4" style="text-align: center; color: red;">Gagal memuat catatan: \$\{e.message\}</td></tr>\`;`
);
html = html.replace(
    /<td data-label="Isi Tulisan" style="font-size: 13px; font-family: 'Inter', sans-serif; line-height: 1\.4;">\$\{safeText\}<\/td>/,
    `<td data-label="Isi Tulisan" style="font-size: 13px; font-family: 'Inter', sans-serif; line-height: 1.4;">\${safeText}</td>
                        <td data-label="Aksi"><button class="btn-hapus-note" data-id="\${doc.id}" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">Hapus</button></td>`
);


// 4. Update fetchPhotos HTML template (for deleted photos only)
html = html.replace(
    /deletedBody\.innerHTML = '<tr><td colspan="4" style="text-align: center;">Belum ada foto di tong sampah\.<\/td><\/tr>';/g,
    `deletedBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Belum ada foto di tong sampah.</td></tr>';`
);
html = html.replace(
    /deletedBody\.innerHTML = \`<tr><td colspan="4" style="text-align: center; color: red;">Gagal memuat sampah: \$\{e\.message\}<\/td><\/tr>\`;/g,
    `deletedBody.innerHTML = \`<tr><td colspan="5" style="text-align: center; color: red;">Gagal memuat sampah: \$\{e.message\}</td></tr>\`;`
);
html = html.replace(
    /<td data-label="Pratinjau Foto">\$\{imgHtml\}<\/td>\s*`;\s*deletedBody\.appendChild\(tr\);/,
    `<td data-label="Pratinjau Foto">\${imgHtml}</td>
                            <td data-label="Aksi"><button class="btn-hapus-sampah" data-id="\${doc.id}" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">Hapus</button></td>
                        \`;
                        deletedBody.appendChild(tr);`
);

// We need to also patch the empty/error state handling for fetchPhotos if we haven't already. Let's see how it looks.

fs.writeFileSync('pages/admin.html', html);
