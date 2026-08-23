const fs = require('fs');
let css = fs.readFileSync('pages/galeri.css', 'utf8');

css = css.replace(/\.polaroid img \{/, '.polaroid img {\n    flex-shrink: 0;');
fs.writeFileSync('pages/galeri.css', css);
