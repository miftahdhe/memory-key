const fs = require('fs');
let html = fs.readFileSync('pages/diary.html', 'utf8');

html = html.replace(
    /<h3 style="font-size: 18px; margin-bottom: 15px; font-weight: 600; color: var\(--text-primary\);">Buat Tulisan Baru<\/h3>/,
    '<h3 style="font-size: 18px; margin-bottom: 5px; font-weight: 600; color: var(--text-primary);">Buat Tulisan Baru</h3>\n            <div id="diary-date-display" style="font-size: 12px; color: var(--text-secondary); margin-bottom: 15px; font-weight: 500;"></div>'
);

html = html.replace(
    /window\.openWriteModal = function\(\) \{/,
    `window.openWriteModal = function() {
            const now = new Date();
            document.getElementById('diary-date-display').innerText = now.toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'});`
);

fs.writeFileSync('pages/diary.html', html);
