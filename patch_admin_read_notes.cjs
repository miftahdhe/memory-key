const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

const replacement1 = `
                    let safeText = data.text ? data.text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\n/g, "<br>") : "-";
                    let displayText = safeText;
                    if (data.text && data.text.length > 80) {
                        let plainTruncated = data.text.substring(0, 80) + '...';
                        let safeTruncated = plainTruncated.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\n/g, " ");
                        let encodedFullText = encodeURIComponent(safeText);
                        displayText = safeTruncated + \`<br><button onclick="openAdminReadModal('Catatan \${data.enteredName || ''}', '\${encodedFullText}')" style="background: none; border: none; color: #3b82f6; padding: 4px 0; font-size: 12px; font-weight: 600; cursor: pointer; text-decoration: underline;">📖 Baca Selengkapnya</button>\`;
                    }
`;

html = html.replace(/const safeText = data\.text \? data\.text\.replace\(\/<\/\g, "&lt;"\)\.replace\(\/>\/g, "&gt;"\)\.replace\(\/\\n\/g, "<br>"\) : "-";/, replacement1);

fs.writeFileSync('pages/admin.html', html);
