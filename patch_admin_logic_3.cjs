const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

html = html.replace(
    /if \(deletedCount === 0\) deletedBody\.innerHTML = '<tr><td colspan="4" style="text-align: center;">Belum ada foto yang dihapus\.<\/td><\/tr>';/,
    `if (deletedCount === 0) deletedBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Belum ada foto yang dihapus.</td></tr>';`
);
html = html.replace(
    /deletedBody\.innerHTML = \`<tr><td colspan="4" style="text-align: center; color: red;">Gagal memuat: \$\{e\.message\}<\/td><\/tr>\`;/g,
    `deletedBody.innerHTML = \`<tr><td colspan="5" style="text-align: center; color: red;">Gagal memuat: \$\{e.message\}</td></tr>\`;`
);

fs.writeFileSync('pages/admin.html', html);
