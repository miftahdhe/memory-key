const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

const startStr = "// Attach listeners when DOM is ready";
const endStr = "async function fetchLogs() {";
const startIndex = html.indexOf(startStr);
const endIndex = html.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const newBlock = `// Attach listeners when DOM is ready
            const btnHapusSemua = document.getElementById('btn-hapus-semua');
            if (btnHapusSemua) {
                btnHapusSemua.addEventListener('click', deleteAllLogs);
            }

            // Event delegation for dynamically added 'Hapus' buttons
            const logBody = document.getElementById('log-body');
            if (logBody) {
                logBody.addEventListener('click', (e) => {
                    const btn = e.target.closest('.btn-hapus-log');
                    if (btn) {
                        const id = btn.getAttribute('data-id');
                        if (id) {
                            deleteLog(id);
                        }
                    }
                });
            }

        `;
    html = html.substring(0, startIndex) + newBlock + html.substring(endIndex);
    fs.writeFileSync('pages/admin.html', html);
} else {
    console.log("Could not find blocks");
}
