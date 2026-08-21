const fs = require('fs');
let js = fs.readFileSync('pages/baca.js', 'utf8');

js = js.replace(/audio\.load\(\);\s*return;/g, 'audio.load();');

fs.writeFileSync('pages/baca.js', js);
