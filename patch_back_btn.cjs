const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.back-btn \{/, '.back-btn {\n    position: relative;\n    z-index: 9999;');
fs.writeFileSync('style.css', css);
