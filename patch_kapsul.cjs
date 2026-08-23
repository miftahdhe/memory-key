const fs = require('fs');
let html = fs.readFileSync('pages/kapsul.html', 'utf8');

html = html.replace(
    /<h3>Tanam Kapsul Waktu<\/h3>/,
    '<h3>Tanam Kapsul Waktu</h3>\n                <div id="capsule-date-display" style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px; font-weight: 500;"></div>'
);

html = html.replace(
    /window\.openAddModal = function\(\) \{/,
    `window.openAddModal = function() {
            const now = new Date();
            document.getElementById('capsule-date-display').innerText = now.toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'});`
);

fs.writeFileSync('pages/kapsul.html', html);
