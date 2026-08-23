const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

const regex = /document\.addEventListener\('DOMContentLoaded', \(\) => \{([\s\S]*?)\}\);/;
const replacement = `$1`; // Just extract the body of the listener and execute it directly.

html = html.replace(regex, replacement);

fs.writeFileSync('pages/admin.html', html);
