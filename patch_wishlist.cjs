const fs = require('fs');
let html = fs.readFileSync('pages/wishlist.html', 'utf8');

// 1. Add date display in the modal
html = html.replace(
    /<h3>Tambah Wishlist Baru<\/h3>/,
    '<h3>Tambah Wishlist Baru</h3>\n                <div id="wish-date-display" style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px; font-weight: 500;"></div>'
);

// 2. Set the date when opening modal
html = html.replace(
    /window\.openAddModal = function\(\) \{/,
    `window.openAddModal = function() {
            const now = new Date();
            document.getElementById('wish-date-display').innerText = now.toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});`
);

// 3. Add date display on the wishlist item
const jsUpdate = `
                    const safeText = data.text ? data.text.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
                    const authorStr = data.enteredName ? data.enteredName.charAt(0).toUpperCase() + data.enteredName.slice(1) : "Anonim";
                    
                    let timeStr = "";
                    if (data.timestamp) {
                        const date = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
                        timeStr = \`<span style="color: #888; font-weight: normal; margin-left: 5px;"> \${date.toLocaleString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>\`;
                    }
                    
                    el.innerHTML = \`
                        <div class="wish-checkbox \${data.completed ? 'checked' : ''}" onclick="toggleWish('\${id}', \${data.completed})"></div>
                        <div class="wish-content">
                            <div class="wish-text">\${safeText}</div>
                            <div class="wish-author">Ditambahkan oleh: \${authorStr}\${timeStr}</div>
                        </div>
                    \`;
`;

html = html.replace(/const safeText = data\.text \? data\.text\.replace\(\/<\/\g, "&lt;"\)\.replace\(\/>\/g, "&gt;"\) : "";[\s\S]*?<\/div>\\n\s*`;/, jsUpdate.trim());

fs.writeFileSync('pages/wishlist.html', html);
