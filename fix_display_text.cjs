const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

html = html.replace(
    /<td data-label="Isi Tulisan" style="font-size: 13px; font-family: 'Inter', sans-serif; line-height: 1\.4;">\$\{safeText\}<\/td>/g,
    `<td data-label="Isi Tulisan" style="font-size: 13px; font-family: 'Inter', sans-serif; line-height: 1.4;">\${displayText}</td>`
);

fs.writeFileSync('pages/admin.html', html);
