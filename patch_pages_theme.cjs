const fs = require('fs');

const pages = fs.readdirSync('pages').filter(f => f.endsWith('.html'));

for (const page of pages) {
    let html = fs.readFileSync('pages/' + page, 'utf8');
    if (!html.includes('theme.js')) {
        html = html.replace(/<\/head>/, '    <script src="../theme.js"></script>\n</head>');
        fs.writeFileSync('pages/' + page, html);
    }
}
