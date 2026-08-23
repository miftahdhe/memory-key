const fs = require('fs');

// Patch Catatan
let htmlC = fs.readFileSync('pages/catatan.html', 'utf8');
htmlC = htmlC.replace(
    /<textarea id="note-text"/,
    '<div id="write-date-display" style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px; font-weight: 500; font-family: \'Inter\', sans-serif;"></div>\n            <textarea id="note-text"'
);

const jsOpenWriteModal = `
        window.openWriteModal = function(type = 'private') {
            currentWriteType = type;
            const modalHeader = document.querySelector('#write-modal .modal-header h3');
            if (type === 'public') {
                modalHeader.innerText = "Tulis Catatan...";
            } else {
                modalHeader.innerText = "Tulis Catatan Privat...";
            }
            const now = new Date();
            const dateStr = now.toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'});
            document.getElementById('write-date-display').innerText = dateStr;
            document.getElementById('write-modal').style.display = 'flex';
        }
`;
htmlC = htmlC.replace(/window\.openWriteModal = function\(type = 'private'\) \{[\s\S]*?document\.getElementById\('write-modal'\)\.style\.display = 'flex';\s*\}/, jsOpenWriteModal.trim());

fs.writeFileSync('pages/catatan.html', htmlC);

// Patch Galeri HTML
let htmlG = fs.readFileSync('pages/galeri.html', 'utf8');

// Add Date info to caption modal
htmlG = htmlG.replace(
    /<h3 style="margin-bottom: 15px; color: var\(--text-primary\);">Tulis Caption Buat Foto Ini<\/h3>/,
    '<h3 style="margin-bottom: 5px; color: var(--text-primary);">Tulis Caption Buat Foto Ini</h3>\n            <div id="caption-date-display" style="font-size: 11px; color: var(--text-secondary); margin-bottom: 15px; font-weight: 500;"></div>'
);

// Populate it when open
htmlG = htmlG.replace(
    /document\.getElementById\('caption-modal'\)\.style\.display = 'flex';/,
    `const now = new Date();
            const dateStr = now.toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
            document.getElementById('caption-date-display').innerText = dateStr;
            document.getElementById('caption-modal').style.display = 'flex';`
);

fs.writeFileSync('pages/galeri.html', htmlG);

