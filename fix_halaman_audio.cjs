const fs = require('fs');
let js = fs.readFileSync('pages/baca.js', 'utf8');

js = js.replace(
    /fetchWait\(\);\s*audio\.src = `\.\.\/assets\/audio\/diary\/diary1\.mp3`;/,
    "fetchWait();\n        audio.src = `../assets/halaman.mp3`;"
);

fs.writeFileSync('pages/baca.js', js);
