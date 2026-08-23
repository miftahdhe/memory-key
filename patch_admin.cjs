const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

html = html.replace(/<th style="width: 15%">Nama Input<\/th>/, '<th style="width: 15%">Nama Input</th>\n                            <th style="width: 15%">PIN Dimasukkan</th>');

// Update colspan in empty loading state
html = html.replace(/colspan="6"/g, 'colspan="7"');
html = html.replace(/colspan="5"/, 'colspan="7"');

// Find the template literal tr.innerHTML = `
// Replace <td data-label="Nama Input"><strong>${data.enteredName || '-'}</strong></td>
// With <td data-label="Nama Input"><strong>${data.enteredName || '-'}</strong></td>
//      <td data-label="PIN Dimasukkan"><code>${data.enteredPin || '-'}</code></td>
html = html.replace(/<td data-label="Nama Input"><strong>\$\{data\.enteredName \|\| '-'\\}<\/strong><\/td>/, 
`<td data-label="Nama Input"><strong>\${data.enteredName || '-'}</strong></td>
                        <td data-label="PIN Dimasukkan"><code style="background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 4px; color: var(--accent); font-weight: bold; letter-spacing: 1px;">\${data.enteredPin || '-'}</code></td>`);

fs.writeFileSync('pages/admin.html', html);
