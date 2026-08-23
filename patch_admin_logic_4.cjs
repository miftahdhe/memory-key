const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

html = html.replace(
    /deletedBody\.innerHTML = \`<tr><td colspan="4" style="text-align: center; color: red;">Gagal memuat data: \$\{e\.message\}<\/td><\/tr>\`;/,
    `deletedBody.innerHTML = \`<tr><td colspan="5" style="text-align: center; color: red;">Gagal memuat data: \$\{e.message\}</td></tr>\`;`
);

fs.writeFileSync('pages/admin.html', html);
