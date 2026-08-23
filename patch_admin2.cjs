const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

html = html.replace(/<td data-label="Nama Input"><strong>\$\{data\.enteredName \|\| '-'\}<\/strong><\/td>/, 
`<td data-label="Nama Input"><strong>\${data.enteredName || '-'}</strong></td>
                        <td data-label="PIN Dimasukkan"><code style="background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 4px; color: var(--accent); font-weight: bold; letter-spacing: 1px;">\${data.enteredPin || '-'}</code></td>`);

fs.writeFileSync('pages/admin.html', html);
