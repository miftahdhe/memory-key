const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

// Add onclick to btn-hapus-semua
html = html.replace(
    /<button id="btn-hapus-semua" class="back-btn"/,
    '<button id="btn-hapus-semua" onclick="deleteAllLogs()" class="back-btn"'
);

// Add max-height and overflow-y to .table-responsive for both desktop and mobile
html = html.replace(
    /\.table-responsive \{\s*overflow-x: auto;\s*\}/,
    `.table-responsive {
            overflow-x: auto;
            max-height: 450px;
            overflow-y: auto;
            border-bottom: 1px solid #e2e8f0;
        }`
);

// We should also patch the mobile css for table-responsive just in case
html = html.replace(
    /\.table-responsive \{\s*margin: 0;\s*padding: 0;\s*\}/,
    `.table-responsive {
                margin: 0;
                padding: 0;
                max-height: 60vh;
                overflow-y: auto;
            }`
);

fs.writeFileSync('pages/admin.html', html);
