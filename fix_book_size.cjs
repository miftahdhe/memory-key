const fs = require('fs');
let css = fs.readFileSync('pages/baca.css', 'utf8');

css = css.replace(/width: 48vw;\s*height: 75vw;/, 'width: 48vw;\n    height: 80vw;');

fs.writeFileSync('pages/baca.css', css);
